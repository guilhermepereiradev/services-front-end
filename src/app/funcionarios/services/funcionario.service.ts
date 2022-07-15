import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // importação do fireStorage
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
//localhost:3000/funcionarios

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/funcionarios';
  atualizarFuncionariosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage, // objeto responsavél por salvar os arquivos no firebase
    private authService: AuthService
  ) { }

  getFuncionarios(): Observable<Funcionario[]>{
    const token = this.authService.recuperarToken();
    return this.http.get<Funcionario[]>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  //http://localhost:3000/funcionarios/id
  deleteFuncionario(func: Funcionario): Observable<any>{
    const token = this.authService.recuperarToken()

    if(func.foto.length > 0){
      return this.storage.refFromURL(func.foto).delete().pipe(
        mergeMap( () => {
          return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        }),
        tap((funcionarios) => {
          this.atualizarFuncionariosSub$.next(true)
        })
        //mergeMap tem a função de pegar dois ou mais objetos e transformar todos em um só
      )
    }
    return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(tap(() => this.atualizarFuncionariosSub$.next(true)));
  }

  getFuncionarioById(id: number): Observable<Funcionario>{
    const token = this.authService.recuperarToken();
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  // RXJS Operators: funçoes que manipulam os dados que os observables te retornam
  salvarFuncionario(func: Funcionario, foto?: File){
    // fazen requisição POST para salavar os dados do funcionario
    // @return o funcionario que acabou de ser salvo
    // pipe é utilizado para os operadores RXJS, map modifica cada dado retornado pelo obsevable

    const token = this.authService.recuperarToken()
    if(foto == undefined){
      return this.http.post<Funcionario>(`${this.baseUrl}/5`, func, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
    }

    return this.http.post<Funcionario>(`${this.baseUrl}/5`, func, {
      headers: {
        Authorizations: `Bearer ${token}`
      }
    }).pipe(map(async (func) => {
      // 1º fazer o upload da imagem e recuperar o link gerado
        if(foto != undefined){  
        const linkFotoFirabase = await this.uploadImagem(foto);

          func.foto = linkFotoFirabase;     
        }
          return this.atualizarFuncionario(func);
        }
      ) 
    )
  }

  atualizarFuncionario(func: Funcionario, foto?: File): any{
    // se a foto não foi passada
    
    if(foto == undefined){
      return this.http.put<Funcionario>(`${this.baseUrl}/${func.idFuncionario}`, func).pipe(
        //tap funciona como forEach, consome cada dado sem modificar
        tap( (funcionario) => {
          // next é a funcao de sucesso
          this.atualizarFuncionariosSub$.next(true)
        })
      )
    } 

    // se ja existir uma foto ligada a esse funcionario, iremos deleta-la
    if(func.foto.length > 0){
      const inscricao = this.storage.refFromURL(func.foto).delete().subscribe( () => {
        inscricao.unsubscribe;
      });
    }

    return this.http.put<Funcionario>(`${this.baseUrl}/${func.idFuncionario}`, func).pipe(
      mergeMap(async (funcionarioAtualizado) => {
      const linkFoto = await this.uploadImagem(foto)
      funcionarioAtualizado.foto = linkFoto

      return this.atualizarFuncionario(funcionarioAtualizado)
    }), tap( () => {
      this.atualizarFuncionariosSub$.next(true);
    }))
  }
  
  // 1º Pegar a imagem
  // 2º Fazer o upload da imagem
  // 3º Gerar o link de download e retorna-lo
  public async uploadImagem(foto: File): Promise<string> {
    // a palavra chave async informa que a função vai trabalhar com codigo assincrono, ou seja, codigos que demoram para serem executados

    const nomeDoArquivo = Date.now(); // retorna a data em milissegundos

    //faz o upload do arquivo para o firebase
    const dados = await this.storage.upload(`${nomeDoArquivo}`, foto);
    //await informa que a linha especifica demora para ser executa
    
    //a propriedade ref é a referencia do arquivo no firebase
    const downloadURL = await dados.ref.getDownloadURL() // retorna um link pro acesso da imagem
    return downloadURL;
  }
  public deletarImagem(func: Funcionario){
    this.storage.refFromURL(func.foto).delete();
  }
}

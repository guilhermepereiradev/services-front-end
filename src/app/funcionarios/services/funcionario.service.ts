import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // importação do fireStorage
//localhost:3000/funcionarios

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly baseUrl: string = 'http://localhost:3000/funcionarios';

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage // objeto responsavél por salvar os arquivos no firebase
  ) { }

  getFuncionarios(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.baseUrl)
  }

  //http://localhost:3000/funcionarios/id
  deleteFuncionario(func: Funcionario): Observable<any>{
    if(func.foto.length > 0){
      return this.storage.refFromURL(func.foto).delete().pipe(
        mergeMap( () => this.http.delete<any>(`${this.baseUrl}/${func.id}`))
      )
    }
    return this.http.delete<any>(`${this.baseUrl}/${func.id}`);
  }

  getFuncionarioById(id: number): Observable<Funcionario>{
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`);
  }


  // RXJS Operators: funçoes que manipulam os dados que os observables te retornam
  salvarFuncionario(func: Funcionario, foto?: File){
    // fazen requisição POST para salavar os dados do funcionario
    // @return o funcionario que acabou de ser salvo
    // pipe é utilizado para os operadores RXJS, map modifica cada dado retornado pelo obsevable

    if(foto == undefined){
      return this.http.post<Funcionario>(this.baseUrl, func)
    }

    return this.http.post<Funcionario>(this.baseUrl, func).pipe(map(async (func) => {
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

  atualizarFuncionario(func: Funcionario): Observable<Funcionario>{
    return this.http.put<Funcionario>(`${this.baseUrl}/${func.id}`, func)
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

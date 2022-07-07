import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { HttpErrorResponse } from '@angular/common/http';
import { ReadKeyExpr, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SalvandoFuncionarioComponent } from '../../components/salvando-funcionario/salvando-funcionario.component';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {



  funcionario!: Funcionario;

  fotoPadrao: string = "../../../../assets/no-profile.webp"
  

  formNovoFunc: FormGroup = this.fb.group({
    nome: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    foto: ['']
  })
  
  foto!: File;
  fotoPreview!: string;
  novoFuncionario!: Funcionario;
  naoEncontrado: boolean = false;
  desabilitar: boolean = true;

  constructor(
    private route: ActivatedRoute, // acessar os parâmetros da rota ativa
    private funcService: FuncionarioService,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
  


  ngOnInit(): void {
    // let idFuncionario = this.route.snapshot.paramMap.get('idFuncionario');
    let idFuncionario = this.route.paramMap.subscribe(
      (params) => {
        let idFuncionario = parseInt(params.get("idFuncionario") ?? '0');

        this.recuperarFuncionario(idFuncionario);
      })

  }

  recuperarFuncionario(id: number): void{
    this.funcService.getFuncionarioById(id).subscribe(
      func => {
        this.funcionario = func;
        this.formNovoFunc.setValue({
          nome: this.funcionario.nome,
          email: this.funcionario.email,
          foto: ''
          });

          this.fotoPreview = this.funcionario.foto;
          this.valorMudou();
      }, (erro: HttpErrorResponse) => {
          this.naoEncontrado = erro.status == 404;
      })


  }

  recuperarFoto(event: any): void{
    this.foto = event.target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(this.foto);
    reader.onload = () =>
    this.fotoPreview = reader.result as string
  }

  async editarFunc(): Promise<void>{ 
    const matDialogRef = this.matDialog.open(SalvandoFuncionarioComponent);
    this.novoFuncionario = this.formNovoFunc.value;
    this.novoFuncionario.id = this.funcionario.id;

    if(this.foto != undefined){
      this.funcService.deletarImagem(this.funcionario);
      this.novoFuncionario.foto = await this.funcService.uploadImagem(this.foto);
    } else {
      this.novoFuncionario.foto = this.funcionario.foto;
    }

    this.funcService.atualizarFuncionario(this.novoFuncionario).subscribe(() => {
      matDialogRef.close();
      this.snackBar.open("Funcionário salvo com sucesso!", "",{duration: 3000})
    })
    
    // this.funcService.salvarFuncionario(this.novoFuncionario, this.foto).subscribe(func => console.log(func))
  }

  valorMudou(){
    // valueChanges é um observable dos formgroups que retorna as modificações.
    this.formNovoFunc.valueChanges.subscribe( valores => { // o parametro valores é um objeto que retorna os valores de cada campo do reactive forms
      this.desabilitar = !(valores.nome != this.funcionario.nome || valores.email != this.funcionario.email || valores.foto.length > 0) || this.formNovoFunc.invalid;
    })
  }

  removerFoto(){
    this.fotoPreview = "";
  }
}

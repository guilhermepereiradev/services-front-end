import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom, Observable } from 'rxjs';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { SalvandoFuncionarioComponent } from '../salvando-funcionario/salvando-funcionario.component';

@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.css']
})
export class FormFuncionarioComponent implements OnInit {

  formFuncionario: FormGroup = this.fb.group({
    nome: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    foto: ['']
  })

  fotoPerfilPadrao: string = "../../../../assets/no-profile.webp";

  foto!: File;
  fotoPreview: string = '';

  constructor(
    private fb: FormBuilder,
    private funcService: FuncionarioService,
    private dialogRef: MatDialogRef<FormFuncionarioComponent>,
    private dialogSalvando: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  recuperarFoto(event: any): void{
    this.foto = event.target.files[0];
    this.carregarPreview();
  }

  carregarPreview(): void{
    const reader =  new FileReader();
    reader.readAsDataURL(this.foto);
    reader.onload = () => {
      this.fotoPreview = reader.result as string;
    }
  }

  salvar(): void {
    const f: Funcionario = this.formFuncionario.value
    let obsSalvar: Observable<any>
    const snackBarRef = this.snackBar;
    const matDialogSalvando = this.dialogSalvando;
    matDialogSalvando.open(SalvandoFuncionarioComponent)

    if(this.formFuncionario.value.foto.length > 0){
      obsSalvar = this.funcService.salvarFuncionario(f, this.foto)
    } else {
      obsSalvar = this.funcService.salvarFuncionario(f)
    }
    
    obsSalvar.subscribe(
      resultado => {
        if(resultado instanceof Promise){
          resultado.then(obs$ => {
            obs$.subscribe( () =>{
              matDialogSalvando.closeAll()
              snackBarRef.open("Funcionário salvo com Sucesso!", "",{duration: 3000})
              this.dialogRef.close()
          })
          })
        }else {
          // se cair no else o func ja foi salvo e não tinha foto pra enviar
          matDialogSalvando.closeAll();
          snackBarRef.open("Funcionário salvo com Sucesso!", "",{
            duration: 3000
          })
          this.dialogRef.close()
        }
      } 
    )
  }
}

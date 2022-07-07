import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarExclusaoComponent } from '../../components/confirmar-exclusao/confirmar-exclusao.component';
import { FormFuncionarioComponent } from '../../components/form-funcionario/form-funcionario.component';
import { FuncionariosModule } from '../../funcionarios.module';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit {

  funcionarios: Funcionario[] = []

  colunas: Array<string> = ['id', 'nome', 'email', 'actions']
  
  constructor(
    private funcService: FuncionarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    // 1º sucesso -> retorna os dados
    // 2º erro -> ocorre um erro na fonte de dados
    // 3º complete -> a fonte de dados te retorna tudo

    this.recuperarFuncionarios();
  }

  excluirFuncionario(func: Funcionario): void{
    const dialogConfirm = this.dialog.open(ConfirmarExclusaoComponent);
    let snackBarRef = this.snackBar;
    dialogConfirm.afterClosed().subscribe(
      deletar =>{
        if(deletar){
          this.funcService.deleteFuncionario(func).subscribe(() => {this.recuperarFuncionarios()})
          snackBarRef.open("Funcionário deletetado com sucesso!", "", {duration: 3000})
        }
      }
    )
  }

  

  recuperarFuncionarios(): void{
    this.funcService.getFuncionarios().subscribe(
      (funcs) => { //sucesso
          this.funcionarios = funcs.reverse();
      }, 
      (erro) => { // erro
        console.log(erro);
      }, 
      () => {// complete
        // console.log("Dados enviados com sucesso");
      }
    )

  }

  abrirFormFuncionario(): void {
    // abrindo o form funcionario e recuperando a referencia desse dialog e guardando na variável
    const referenciaDialog = this.dialog.open(FormFuncionarioComponent);
    referenciaDialog.afterClosed().subscribe(
      () => this.recuperarFuncionarios()
    )
  }
}
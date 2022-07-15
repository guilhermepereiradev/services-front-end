import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
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

  colunas: Array<string> = ['id', 'nome', 'email', 'cargo','actions']
  
  constructor(
    private funcService: FuncionarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {

    // 1º sucesso -> retorna os dados
    // 2º erro -> ocorre um erro na fonte de dados
    // 3º complete -> a fonte de dados te retorna tudo
    this.funcService.atualizarFuncionariosSub$.subscribe( (precisaAtualizar) => {
      
      if(precisaAtualizar){
        this.recuperarFuncionarios();
      }
    })
    this.recuperarFuncionarios();
  }

  excluirFuncionario(func: Funcionario): void{
    const dialogConfirm = this.dialog.open(ConfirmarExclusaoComponent);
    let snackBarRef = this.snackBar;
    dialogConfirm.afterClosed().subscribe(
      deletar =>{
        if(deletar){
          this.funcService.deleteFuncionario(func).subscribe(() => {
            this.router.navigate(['/funcionarios'])
          })
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
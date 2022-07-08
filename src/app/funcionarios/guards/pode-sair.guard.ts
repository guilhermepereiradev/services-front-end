import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PodeSairComponent } from '../components/pode-sair/pode-sair.component';
import { FuncionarioComponent } from '../pages/funcionario/funcionario.component';

@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<FuncionarioComponent> {

  constructor (
    private dialogRef: MatDialog
  ){}
  canDeactivate(
    component: FuncionarioComponent, //representa o componente que ele está inserido
    currentRoute: ActivatedRouteSnapshot, // a partir dele conseguimos acessar o valor dos parametros
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // se o guard retornar o valor TRUE o usuario PODE sair da página
      // se o guar retornar o valor FALSE o usuario NÂO PODE sair da página

      const nome = component.formNovoFunc.value.nome;
      const email = component.formNovoFunc.value.email;
      const foto = component.formNovoFunc.value.foto;

     


      if(nome != component.funcionario.nome || email != component.funcionario.email || foto.length > 0){
        
        const dialogRef = this.dialogRef.open(PodeSairComponent);
        let querSair: Observable<boolean> = dialogRef.afterClosed();
        return querSair;
      } else {
        return true;
      }
  }
  
}

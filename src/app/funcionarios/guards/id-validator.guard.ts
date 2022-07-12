import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterPreloader, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FuncionariosRoutingModule } from '../funcionarios-routing.module';

@Injectable({
  providedIn: 'root'
})
export class IdValidatorGuard implements CanActivate {
  constructor(
    private router: Router //objeto responsavel por fazer o roteamento das paginas pelo ts
  ){}
  canActivate(
    route: ActivatedRouteSnapshot, //você tem acesso aos parametros da rota
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const idFuncionario = parseInt(route.paramMap.get('idFuncionario') as string)
    
      if(isNaN(idFuncionario)){
        return this.router.parseUrl('/funcionarios')
      }
      return true;
  }
  
}

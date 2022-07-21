import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListarClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }

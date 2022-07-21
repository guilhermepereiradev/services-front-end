import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { MaterialModule } from '../material/material.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormClienteComponent } from './components/form-cliente/form-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarClientesComponent,
    FormClienteComponent,
    
    
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }

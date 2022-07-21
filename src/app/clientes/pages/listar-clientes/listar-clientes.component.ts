import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormClienteComponent } from '../../components/form-cliente/form-cliente.component';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes!: Cliente[]


  colunas: string[] = ['idCliente', 'nome', 'email', 'endereco', 'acoes'];

  constructor(
    private clienteService: ClienteService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getClientes()
    this.getClienteById(32)
  }

  getClientes(){
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    )
  }

  getClienteById(idCliente: number){
    return this.clienteService.getClienteById(idCliente).subscribe(
      cliente => console.log(cliente)
    )
  }

  abrirFormCliente(){
    this.matDialog.open(FormClienteComponent)
  }
}

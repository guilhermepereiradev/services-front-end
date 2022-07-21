import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/clientes'
  
  
  constructor(
    private http: HttpClient
  ) { }

    getClientes(){
      return this.http.get<Cliente[]>(this.baseUrl)
    }

    getClienteById(idCliente: number){
      return this.http.get<Cliente>(`${this.baseUrl}/${idCliente}`)
    }

    postCliente(cliente: Cliente){
      return this.http.post<Cliente>(this.baseUrl, cliente)
    }
}

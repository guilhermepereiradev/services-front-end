import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/cargos'

  constructor(
    private http: HttpClient,

  ) { }

  getCargos(){
    return this.http.get<Cargo[]>(this.baseUrl)
  }

  getCargoById(idCargo: number){
    return this.http.get<Cargo>(`${this.baseUrl}/idCargo`)
  }
}

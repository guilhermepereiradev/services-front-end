import { Component, OnInit } from '@angular/core';
import { Cargo } from '../../models/cargo';
import { CargosService } from '../../services/cargos.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  cargos: Cargo[] = [];


  dataSource = this.cargos;
  colunas = ['id', 'nome', 'descricao', 'salario']
  

  constructor(
    private cargosService: CargosService
  ) { }
    
  ngOnInit(): void {
    this.getCargos()
  }

  getCargos(): void{
    this.cargosService.getCargos().subscribe(
      (cargos) => {
      this.cargos = cargos
      }
    )
  }

  mostrar(){
    console.log(this.cargos)
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  checked: boolean = false



  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  formEndereco: FormGroup = this.fb.group({
    rua: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    uf: ['', [Validators.required]]
  })
  ngOnInit(): void {
  }

  getEnderecoPeloCep(cep: string){
    if(cep.length >= 8){
       this.teste(cep).subscribe(
        endereco => this.popularForm(endereco)
        
      )
    }
  }
  teste(cep: string): Observable<any>{
    return  this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)

  }

  popularForm(viacep: any){
    this.formEndereco.setValue({
      rua: viacep.logradouro,
      bairro: viacep.bairro,
      cidade: viacep.localidade,
      uf: viacep.uf
    })
  }
}
  

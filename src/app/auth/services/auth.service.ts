import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = 'http://localhost:8080'

  constructor(
    private http: HttpClient
  ) { }

  signIn(user: User): Observable<{ Authorization: string }>{
    return this.http.post<{Authorization: string}>(`${this.baseUrl}/login`, user).pipe(
      //o tap consome o dado enviado pelo observable mas não o modifica ou retorna
      tap( response => {
        this.armazenarToken(response.Authorization)
      })
    )
  }

  armazenarToken(token: string): void{
    localStorage.setItem('authorization', token)
  }

  recuperarToken(): string | null{
    return localStorage.getItem('authorization')
  }
}

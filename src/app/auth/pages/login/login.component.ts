import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  
  loginForm: FormGroup = this.fb.group({
    login: ['',[Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login(): void{
    const credencias = this.loginForm.value
    this.authService.signIn(credencias).subscribe( () => {
      this.snackBar.open("Logado com sucesso", "", {duration: 3000})
      this.router.navigateByUrl("/funcionarios")
    },
    () =>{ this.snackBar.open("Não foi possível logar", "", {duration: 3000})})
  }
}

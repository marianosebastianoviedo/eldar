import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  value!: string;
  loginForm: FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private nav:Router,
    private appC:AppComponent
  ){
    this.loginForm = this.formBuilder.group({
      user:['',[Validators.required, Validators.minLength(3)]],
      pass:['',[Validators.required, Validators.pattern('^.{3}$|^.{4}$')]],
    });
  }
  get userNoValido(){
    return this.loginForm.get('user')?.invalid && this.loginForm.get('user')?.touched;
  }
  get passNoValido(){
    return this.loginForm.get('pass')?.invalid && this.loginForm.get('pass')?.touched;
  }
  login(){
    const value:User = this.loginForm.value;
    const admin:User = {user: 'mariano', pass: 'ovie'};
    const usr:User = {user: 'eldar', pass: 'eld'};

    if (value.user === admin.user && value.pass === admin.pass) {
      this.messageService.add({ severity: 'success', summary: 'ADMINISTRADOR', detail: 'Acceso total' });
      this.appC.login();
      this.appC.adm();
      this.nav.navigate(['/dashboard']);
    } else if (value.user === usr.user && value.pass === usr.pass){
      this.messageService.add({ severity: 'success', summary: 'USUARIO', detail: 'Acceso limitado' });
      this.appC.login();
      this.appC.noAdmin();
      this.nav.navigate(['/dashboard']);
    } else {
      console.log('Credenciales incorrectas');
      this.messageService.add({ severity: 'error', summary: 'Acceso denegado', detail: 'Credenciales incorrectas' });
      this.appC.logout();
      this.appC.noAdmin();
    }
  }
}

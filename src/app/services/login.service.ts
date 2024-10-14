import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private appComponent:AppComponent) { 

  }

  get isAdmin() : Boolean {
    return this.appComponent.isAdmin();
  }
  get isLogged() : Boolean {
    return this.appComponent.isLogged();
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  public static logged: boolean = false;
  public static admin: boolean = false;
  title = 'eldar';

  constructor(){
    if(localStorage.getItem('login') === 'true'){
      this.login();
      if(localStorage.getItem('admin') === 'true'){
        this.adm();
      }else if (localStorage.getItem('admin') === 'false'){
        this.noAdmin();
      }
    } else {
      localStorage.clear();
    }
      
    
  }
  ngOnInit(): void {
    
  }


  get isLogged():boolean{
    return AppComponent.logged;
  }
  login(){
    AppComponent.logged = true;
    localStorage.setItem('login', 'true');
  }
  logout(){
    AppComponent.logged = false;
    localStorage.setItem('login', 'false');
  }
  isAdmin():boolean{
    return AppComponent.admin;
  }
  adm(){
    AppComponent.admin = true;
    localStorage.setItem('admin', 'true');
  }
  noAdmin(){
    AppComponent.admin = false;
    localStorage.setItem('admin', 'false');
  }
}

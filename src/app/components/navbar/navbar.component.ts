import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToolbarModule, AvatarModule, AvatarGroupModule, MenubarModule, BadgeModule, CommonModule, RippleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
 
  constructor(private appC:AppComponent, private nav:Router){
    
    
    this.items = [
      {
          label: 'Logout',
          icon: 'pi pi-user',
          command: ()=>{
            this.appC.noAdmin();
            this.appC.logout();
            this.nav.navigate(['/login'])
          }
      },
      {
          label: 'Dashboard',
          icon: 'pi pi-chart-bar',
          routerLink:"/dashboard"
      }
  ];
  }
  get userCategory(){
    return this.appC.isAdmin();
  }
}

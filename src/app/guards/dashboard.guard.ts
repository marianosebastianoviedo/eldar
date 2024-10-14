import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppComponent } from '../app.component';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const appC = inject(AppComponent)
  if(appC.isLogged){
    return true;
  } else {
    router.navigate(['/login']);
    return false; 
  }
};

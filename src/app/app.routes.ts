import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { dashboardGuard } from './guards/dashboard.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [dashboardGuard]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    }
];

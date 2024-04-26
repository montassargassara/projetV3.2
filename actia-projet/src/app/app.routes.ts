import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProfilComponent } from './modules/profil/profil.component';
import { LeaveRequestComponent } from './modules/leave-request/leave-request.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './modules/login/login.component';
import { TeamsComponent } from './modules/crud/teams/teams.component';
import { EmployeesComponent } from './modules/crud/employees/employees.component';
import { MapsComponent } from './modules/maps/maps.component';
import { ResetPasswordComponent } from './modules/login/reset-password/reset-password.component';
import { RequestResetPasswordComponent } from './modules/login/request-reset-password/request-reset-password.component';
import { ResetPasswordGuard } from './_services/reset-password.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  
    // Route pour 'login'
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent},
    { path: 'request-reset-password', component: RequestResetPasswordComponent },
    {
        path: '',
        component: LayoutComponent, // Appliquez AuthGuard au layout
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: ProfilComponent },
            { path: 'list', component: TeamsComponent },
            { path: 'congé', component: LeaveRequestComponent },
            { path: 'employees/:teamId', component: EmployeesComponent },
            { path: 'maps', component: MapsComponent },
            { path: 'employees', component: EmployeesComponent },
        ]
    }
];

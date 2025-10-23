import { Routes } from '@angular/router';
import { AuthComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];

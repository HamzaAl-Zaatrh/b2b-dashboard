import { Routes } from '@angular/router';
import {authGuard} from '@core/guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () => import('@auth/auth.routes'),
  // },
  {
    path: '',
    canActivate: [authGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./features/main/main.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

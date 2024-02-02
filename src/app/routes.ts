import { Routes } from '@angular/router';
import { AppLayoutComponent } from "./shared/app-layout";

export const appRoutes: Routes = [
 {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'sessions',
        loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
      },
    ]
 }
];
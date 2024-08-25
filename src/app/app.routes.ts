import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: ()  => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path:'Dashboard',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }

];



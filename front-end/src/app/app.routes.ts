import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Home page
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    // Wildcard route - 404
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
];

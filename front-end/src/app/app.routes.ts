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
    // Home page
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    // Exercise list page
    path: 'exercises',
    loadComponent: () =>
      import('./features/exercise/exercise-list/exercise-list.component').then(
        (m) => m.ExerciseListComponent
      ),
    title: 'Exercises',
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

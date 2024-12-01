import { Routes } from '@angular/router';
import { RouterExtension as RoutesUtils } from './shared/utils/router-extension';

export const routes: Routes = [
  {
    // Empty path redirects to home page /home
    path: '',
    redirectTo: RoutesUtils.HOME,
    pathMatch: 'full',
  },
  {
    // Home page
    path: RoutesUtils.HOME,
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: RoutesUtils.getRouteByPath(RoutesUtils.HOME)!.title,
  },
  {
    // Wildcard route - 404
    path: RoutesUtils.NOT_FOUND,
    pathMatch: 'full',
    // TODO: change the component to be the one for error 404
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: RoutesUtils.getRouteByPath(RoutesUtils.NOT_FOUND)!.title,
  },
];

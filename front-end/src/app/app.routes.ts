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
    // Exercise list page
    path: RoutesUtils.EXERCISES,
    loadComponent: () =>
      import('./features/exercise/exercise-list/exercise-list.component').then(
        (m) => m.ExerciseListComponent
      ),
    title: RoutesUtils.getRouteByPath(RoutesUtils.EXERCISES)!.title,
  },
  // {
  //   // Session page
  //   path: RoutesUtils.SESSION,
  //   loadComponent: () =>
  //     import('./features/session/session/session.component').then(
  //       (m) => m.SessionComponent
  //     ),
  //   title: RoutesUtils.getRouteByPath(RoutesUtils.SESSION)!.title,
  // },
  {
    // Wildcard route - 404
    path: RoutesUtils.NOT_FOUND,
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: RoutesUtils.getRouteByPath(RoutesUtils.NOT_FOUND)!.title,
  },
];

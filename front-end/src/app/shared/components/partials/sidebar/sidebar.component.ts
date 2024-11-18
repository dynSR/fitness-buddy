import { Component, inject } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly routes: Array<{ path: string; title: string; icon: string }> = [
    {
      path: '/home',
      title: 'page.home',
      icon: 'assets/icons/home.svg',
    },
    {
      path: 'exercises',
      title: 'page.exercises',
      icon: 'assets/icons/exercises.png',
    },
  ];
  readonly logOutIconSrc: string = 'assets/icons/auth/log-out.svg';

  readonly router: Router = inject(Router);

  constructor() {}

  isRouteActive(path: string): boolean {
    return this.router.url === path;
  }
}

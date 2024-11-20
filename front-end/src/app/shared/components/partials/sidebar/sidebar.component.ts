import { Component, inject } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RouteData, RouterExtension } from '../../../utils/router-extension';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private _routes: Array<RouteData> = RouterExtension.getRoutesData();
  readonly logOutIconSrc: string = 'assets/icons/auth/log-out.svg';

  readonly router: Router = inject(Router);

  constructor() {}

  get routes(): Array<RouteData> {
    return this._routes;
  }
}

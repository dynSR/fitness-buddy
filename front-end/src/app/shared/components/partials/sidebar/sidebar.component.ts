import { Component } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly logOutIconSrc: string = 'assets/icons/auth/log-out.svg';
}

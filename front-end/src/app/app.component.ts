import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/partials/header/header.component';
import { SidebarComponent } from './shared/components/partials/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'front-end';
}

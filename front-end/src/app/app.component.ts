import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/partial/header/header.component';
// import { SidebarComponent } from './shared/components/partial/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    // SidebarComponent
  ],
  template: `
    <app-header />
    <!-- <app-sidebar></app-sidebar> -->

    <main class="container-fluid">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {}

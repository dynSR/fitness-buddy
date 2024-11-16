import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly appTitle: string = "Fitness Buddy's logo - redirects to home page.";
  readonly appLogoSrc: string = 'assets/images/logo.png';
}

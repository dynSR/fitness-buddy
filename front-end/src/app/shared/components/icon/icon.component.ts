import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  @Input({ required: true }) src: string = '';
  @Input({ required: true }) alt: string = '';
  @Input({ required: false }) title: string = 'Unassigned title';
  @Input({ required: false }) class: string = 'img-container';
}

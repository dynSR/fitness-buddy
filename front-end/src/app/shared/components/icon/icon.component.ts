import { Component, Input } from '@angular/core';
import { Icon } from './icon.interface';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent implements Icon {
  @Input({ required: true }) src!: string;
  @Input({ required: true }) alt!: string;
  @Input({ required: false }) title!: string;
  @Input({ required: false }) class: string | undefined = 'img-container';

  constructor() {}
}

import { Component, Input } from '@angular/core';
import { Icon } from '../icon.interface';

@Component({
  selector: 'app-icon-text',
  standalone: true,
  imports: [],
  templateUrl: './icon-text.component.html',
  styleUrls: ['../icon.component.css', './icon-text.component.css'],
})
export class IconTextComponent implements Icon {
  @Input({ required: true }) src!: string;
  @Input({ required: true }) alt!: string;
  @Input({ required: false }) title: string = '';
  @Input({ required: false }) class: string = 'img-container';

  @Input({ required: true }) text!: string;
  @Input({ required: false }) textClass!: string;
}

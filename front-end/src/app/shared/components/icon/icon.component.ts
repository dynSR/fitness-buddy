import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Icon } from './icon.interface';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent implements Icon {
  @ViewChild('container') imgContainer!: ElementRef<HTMLDivElement>;
  @Input({ required: true }) src!: string;
  @Input({ required: true }) alt: string = '';
  @Input({ required: false }) title: string = '';
  @Input({ required: false }) class: string | undefined = 'img-container';

  constructor() {}

  setIcon(src: string): void {
    this.src = src;
  }

  setAlt(alt: string): void {
    this.alt = alt;
  }

  setTitle(title: string): void {
    this.title = title;
  }
}

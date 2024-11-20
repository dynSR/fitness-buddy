import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  @Input({ required: true }) alt: string = '';
  @Input({ required: false }) title: string = '';
  @Input({ required: false }) class: string | undefined = 'img-container';

  @Input({ required: true }) text!: string;
  @Input({ required: false }) textClass!: string;
  @Input({ required: false }) gap!: number;

  @ViewChild('imgContainer') imgContainer!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit() {
    this.setGap(this.gap);
  }

  setGap(gap: number) {
    this.imgContainer.nativeElement.style.gap = gap + 'px';
  }
}

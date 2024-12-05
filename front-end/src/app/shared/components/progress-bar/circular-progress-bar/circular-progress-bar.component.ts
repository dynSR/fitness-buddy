import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Precondition } from '../../../utils/precondition';
import { IProgressBar } from '../../../interfaces/progress-bar';

@Component({
  selector: 'app-circular-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './circular-progress-bar.component.html',
  styleUrl: './circular-progress-bar.component.css',
})
export class CircularProgressBarComponent implements IProgressBar {
  min: number = 0;
  max: number = 0;
  value: number = 0;

  @ViewChild('progress')
  element?: ElementRef<HTMLElement> | undefined;
  @Input({ required: true }) isDisplayable!: boolean;
  isDisplayed: boolean = false;

  displayedClassName: string = 'progress-bar--displayed';
  hiddenClassName: string = 'progress-bar--hidden';

  constructor() {}

  set(value: number, max: number): void {
    this.value = value;
    this.max = max;

    this.update(value);
  }

  update(value: number): void {
    Precondition.notNull(this.element, '[Update] - element is not found.');

    let progress = (value / this.max) * 360;
    this.element.nativeElement.style.background = `conic-gradient(var(--color-primary) ${progress}deg, rgba(255, 255, 255, 0.1) 0deg)`;
  }

  display(): void {
    Precondition.notNull(this.element, '[Display] - element is not found.');

    if (
      this.element.nativeElement.classList.replace(
        this.hiddenClassName,
        this.displayedClassName
      )
    ) {
      this.isDisplayed = true;
    }
  }

  hide(): void {
    Precondition.notNull(this.element, '[Hide] - element is not found.');

    if (
      this.element.nativeElement.classList.replace(
        this.displayedClassName,
        this.hiddenClassName
      )
    ) {
      this.isDisplayed = false;
    }
  }
}

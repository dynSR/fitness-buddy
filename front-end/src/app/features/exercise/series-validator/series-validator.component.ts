import { Component, ElementRef, Input, ViewChildren } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NumberToArrayPipe } from '../../../shared/pipes/number-to-array/number-to-array.pipe';

interface Validator {
  img: ElementRef<HTMLImageElement>;
  isValidated: boolean;
}

@Component({
  selector: 'app-exercise-series-counter',
  standalone: true,
  imports: [CommonModule, NumberToArrayPipe],
  template: `<div
    class="series-validator d-flex align-items-center gap-1"
    (mouseleave)="handleGroupMouseLeave()"
  >
    <img
      #validator
      *ngFor="let _ of series | numToArray; let i = index"
      [src]="'assets/icons/circle.png'"
      alt=""
      class="series-validator__icon"
      (mouseenter)="handleValidatorMouseEnter(i)"
      (mouseleave)="handleValidatorMouseLeave(i)"
    />
  </div>`,
  styleUrl: './series-validator.component.css',
})
export class ExerciseSeriesCounterComponent {
  @Input({ required: true }) series!: number;
  @ViewChildren('validator') iconComponents!: Array<
    ElementRef<HTMLImageElement>
  >;
  validators: Array<Validator> = new Array<Validator>();

  idleIcon = 'assets/icons/circle.png';
  validatedIcon = 'assets/icons/circle-full.png';

  constructor() {}

  ngAfterViewInit(): void {
    this.iconComponents.forEach((comp) => {
      const validator: Validator = {
        img: comp,
        isValidated: false,
      };
      this.validators.push(validator);

      this.validators.forEach((validator, index) => {
        validator.img.nativeElement.addEventListener('click', () =>
          this.validateSeries(index)
        );
      });
    });
  }

  validateSeries(index: number): void {
    for (let i = 0; i <= index; i++) {
      const validator = this.validators[i];
      validator.img.nativeElement.src = this.validatedIcon;
      validator.isValidated = true;
      validator.img.nativeElement.classList.replace(
        'series-validator__icon',
        'series-validator__icon--validated'
      );
    }
  }

  handleValidatorMouseEnter(index: number): void {
    if (this.validators[index].isValidated) {
      return;
    }

    console.log('[handleValidatorMouseEnter] - index : ', index);

    for (let i = 0; i <= index; i++) {
      if (!this.validators[i].isValidated) {
        this.validators[i].img.nativeElement.src = this.validatedIcon;
      }
    }
  }

  handleValidatorMouseLeave(index: number): void {
    if (this.validators[index].isValidated) {
      return;
    }

    const validator = this.validators[index];
    if (!validator.isValidated) {
      validator.img.nativeElement.src = this.idleIcon;
    }
  }

  handleGroupMouseLeave(): void {
    this.validators.forEach((v) => {
      if (!v.isValidated) {
        v.img.nativeElement.src = this.idleIcon;
      }
    });
  }
}

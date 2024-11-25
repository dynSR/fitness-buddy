import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { NumberToArrayPipe } from '../../../../shared/pipes/number-to-array/number-to-array.pipe';

interface Validator {
  iconComponent: IconComponent;
  isValidated: boolean;
}

@Component({
  selector: 'app-exercise-series-counter',
  standalone: true,
  imports: [CommonModule, IconComponent, NumberToArrayPipe],
  templateUrl: './series-validator.component.html',
  styleUrl: './series-validator.component.css',
})
export class ExerciseSeriesCounterComponent {
  @Input({ required: true }) series!: number;
  @ViewChildren(IconComponent) iconComponents!: QueryList<IconComponent>;
  validators: Array<Validator> = new Array<Validator>();

  idleIcon = 'assets/icons/circle.png';
  validatedIcon = 'assets/icons/circle-full.png';
  previewIcon = 'assets/icons/default.svg';

  constructor() {}

  ngAfterViewInit(): void {
    this.iconComponents.forEach((comp) => {
      const validator: Validator = {
        iconComponent: comp,
        isValidated: false,
      };
      this.validators.push(validator);

      comp.imgContainer.nativeElement.classList.add('series-validator__icon');

      this.validators.forEach((validator, index) => {
        validator.iconComponent.imgContainer.nativeElement.addEventListener(
          'click',
          () => this.validateSeries(index)
        );
      });
    });
  }

  validateSeries(index: number): void {
    for (let i = 0; i <= index; i++) {
      this.validators[i].iconComponent.src = this.validatedIcon;
      this.validators[i].isValidated = true;
    }
  }

  handleValidatorMouseEnter(index: number): void {
    if (this.validators[index].isValidated) {
      return;
    }

    console.log('[handleValidatorMouseEnter] - index : ', index);

    for (let i = 0; i <= index; i++) {
      if (!this.validators[i].isValidated) {
        this.validators[i].iconComponent.src = this.previewIcon;
      }
    }
  }

  handleValidatorMouseLeave(index: number): void {
    if (this.validators[index].isValidated) {
      return;
    }

    const validator = this.validators[index];
    if (!validator.isValidated) {
      validator.iconComponent.src = this.idleIcon;
    }
  }

  handleGroupMouseLeave(): void {
    this.validators.forEach((v) => {
      if (!v.isValidated) {
        v.iconComponent.src = this.idleIcon;
      }
    });
  }
}

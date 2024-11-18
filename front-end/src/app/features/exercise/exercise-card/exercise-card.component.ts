import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { BaseSelectable } from '../../../shared/components/selectable/base-selectable';
import { Exercise } from '../../../models/exercise.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TimeFormatter } from '../../../shared/utils/time-formatter';
import { CommonModule } from '@angular/common';
import { NumberToArrayPipe } from '../../../shared/pipes/number-to-array/number-to-array.pipe';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule, IconComponent, NumberToArrayPipe],
  templateUrl: './exercise-card.component.html',
  styleUrls: [
    './exercise-card.component.css',
    '../../../shared/components/selectable/selectable.css',
  ],
})
export class ExerciseCardComponent extends BaseSelectable {
  @Input({ required: true }) exercise!: Exercise;
  @ViewChild('selectable') declare element: ElementRef;
  @Input({ required: true }) declare canBeSelected: boolean;

  readonly timeFormatter = inject(TimeFormatter);

  constructor() {
    super();
  }

  getExerciseRepetitions(): string {
    return this.exercise.series + '*' + this.exercise.repetitions;
  }

  getRecoveryTime(): string {
    return (
      this.timeFormatter.formatToSecondsMinutes(this.exercise.recoveryTime) +
      '"'
    );
  }
}

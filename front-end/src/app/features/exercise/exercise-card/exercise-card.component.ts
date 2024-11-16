import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { BaseSelectable } from '../../../shared/components/selectable/base-selectable';
import { Exercise } from '../../../models/exercise.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { IconTextComponent } from '../../../shared/components/icon/icon-text/icon-text.component';
import { TimeFormatter } from '../../../shared/utils/time-formatter';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [IconComponent, IconTextComponent],
  templateUrl: './exercise-card.component.html',
  styleUrls: [
    './exercise-card.component.css',
    '../../../shared/components/selectable/selectable.css',
  ],
})
export class ExerciseCardComponent extends BaseSelectable {
  @Input({ required: true }) exercise!: Exercise;
  @ViewChild('selectable') declare element: ElementRef;

  readonly timeFormatter = inject(TimeFormatter);

  constructor() {
    super();
  }

  ngAfterViewInit() {
    console.log(this.element);
  }

  getExerciseRepetitions(): string {
    return this.exercise.series + 'x' + this.exercise.repetitions;
  }

  getRecoveryTime(): string {
    return (
      this.timeFormatter.formatToSecondsMinutes(this.exercise.recoveryTime) +
      '"'
    );
  }
}

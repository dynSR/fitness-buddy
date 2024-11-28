import { Component, inject, Input } from '@angular/core';
import { Exercise } from '../../exercise.model';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { TimeFormatter } from '../../../../shared/helpers/time-formatter';
import { CommonModule } from '@angular/common';
import { ExerciseSeriesCounterComponent } from '../../series-validator/series-validator.component';
import { IndexComponent } from '../../../../shared/components/index/index.component';

@Component({
  selector: 'app-exercise-list-item',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    ExerciseSeriesCounterComponent,
    IndexComponent,
  ],
  templateUrl: './exercise-list-item.component.html',
  styleUrls: [
    '../../../../shared/interfaces/selectable/selectable.css',
    './exercise-list-item.component.css',
  ],
})
export class ExerciseListItemComponent {
  @Input({ required: true }) exercise!: Exercise;

  readonly timeFormatter = inject(TimeFormatter);

  constructor() {}

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

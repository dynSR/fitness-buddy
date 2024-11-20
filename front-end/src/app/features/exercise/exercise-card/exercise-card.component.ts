import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ISelectable,
  Selectable,
} from '../../../shared/components/selectable/selectable';
import { Exercise } from '../../../models/exercise.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TimeFormatter } from '../../../shared/utils/time-formatter';
import { CommonModule } from '@angular/common';
import { ExerciseSeriesCounterComponent } from '../exercise-series-counter/exercise-series-counter.component';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [CommonModule, IconComponent, ExerciseSeriesCounterComponent],
  templateUrl: './exercise-card.component.html',
  styleUrls: [
    './exercise-card.component.css',
    '../../../shared/components/selectable/selectable.css',
  ],
})
export class ExerciseCardComponent extends Selectable {
  @Input({ required: true }) exercise!: Exercise;

  @ViewChild('selectable') declare element: ElementRef;
  @ViewChild('index') declare indexElement: ElementRef;
  @Input({ required: true }) declare canBeSelected: boolean;
  @Output() override onClickEmitter: EventEmitter<ISelectable> =
    new EventEmitter<ISelectable>();

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

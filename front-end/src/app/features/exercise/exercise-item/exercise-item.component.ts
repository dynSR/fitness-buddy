import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Exercise } from '../../../models/exercise.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TimeFormatter } from '../../../shared/helpers/time-formatter';
import { CommonModule } from '@angular/common';
import { ExerciseSeriesCounterComponent } from './series-validator/series-validator.component';
import { IndexComponent } from '../../../shared/components/index/index.component';
import { BaseSelectable } from '../../../shared/interfaces/selectable/base-selectable';
import { ISelectable } from '../../../shared/interfaces/selectable/selectable';

@Component({
  selector: 'app-exercise-item',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    ExerciseSeriesCounterComponent,
    IndexComponent,
  ],
  templateUrl: './exercise-item.component.html',
  styleUrls: [
    '../../../shared/interfaces/selectable/selectable.css',
    './exercise-item.component.css',
  ],
})
export class ExerciseItemComponent extends BaseSelectable {
  @Input({ required: true }) exercise!: Exercise;

  @ViewChild('selectable') override element?: ElementRef = undefined;

  @Input({ required: true }) override isInteractable: boolean = true;
  @Input({ required: true }) isIndexVisible!: boolean;
  @Output() override onSelectableClicked: EventEmitter<ISelectable> =
    new EventEmitter<ISelectable>();

  readonly timeFormatter = inject(TimeFormatter);

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
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

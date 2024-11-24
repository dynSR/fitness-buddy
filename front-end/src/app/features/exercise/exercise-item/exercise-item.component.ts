import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Query,
  QueryList,
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
import { ExerciseSeriesCounterComponent } from './series-validator/series-validator.component';
import { IndexComponent } from '../../../shared/components/index/index.component';

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
    '../../../shared/components/selectable/selectable.css',
    './exercise-item.component.css',
  ],
})
export class ExerciseItemComponent extends Selectable {
  @Input({ required: true }) exercise!: Exercise;

  @ViewChild('selectable') declare element: ElementRef;

  @Input({ required: true }) declare isInteractable: boolean;
  @Input({ required: true }) declare isIndexVisible: boolean;
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

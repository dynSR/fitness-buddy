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
import { ExerciseSeriesCounterComponent } from './series-validator/series-validator.component';

@Component({
  selector: 'app-exercise-item',
  standalone: true,
  imports: [CommonModule, IconComponent, ExerciseSeriesCounterComponent],
  templateUrl: './exercise-item.component.html',
  styleUrls: [
    '../../../shared/components/selectable/selectable.css',
    './exercise-item.component.css',
  ],
})
export class ExerciseItemComponent extends Selectable {
  @Input({ required: true }) exercise!: Exercise;

  @ViewChild('selectable') declare element: ElementRef;
  @ViewChild('index') declare indexElement: ElementRef;
  @Input({ required: true }) declare isSelectable: boolean;
  @Input({ required: true }) declare isIndexVisible: boolean;
  @Output() override onSelectableClickEmitter: EventEmitter<ISelectable> =
    new EventEmitter<ISelectable>();

  readonly timeFormatter = inject(TimeFormatter);

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
    console.log(
      'interactable ? ' + this.isInteractable,
      'selectable ? ' + this.isSelectable
    );
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

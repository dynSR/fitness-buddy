import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseSelectable } from '../../../shared/components/selectable/base-selectable';
import { Exercise } from '../exercise.model';
import { ISelectable } from '../../../shared/interfaces/selectable/selectable';
import { TimeFormatter } from '../../../shared/helpers/time-formatter';

@Component({
  selector: 'app-exercise-selector',
  standalone: true,
  imports: [],
  templateUrl: './exercise-selector.component.html',
  styleUrls: [
    '../../../shared/components/selectable/base-selectable.css',
    '../../../shared/css/input.css',
    './exercise-selector.component.css',
  ],
})
export class ExerciseSelectorComponent extends BaseSelectable {
  @Input({ required: true }) exercise!: Exercise;

  @ViewChild('selectable')
  override elementRef?: ElementRef<HTMLDivElement> | undefined = undefined;
  @Output() override onSelectableClicked: EventEmitter<ISelectable> =
    new EventEmitter();

  private readonly _timeFormatter = inject(TimeFormatter);

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  getExerciseRestTime(): string {
    return (
      this._timeFormatter.formatToSecondsMinutes(this.exercise.restTime) + '"'
    );
  }

  getTotalRepetitions(): string {
    return this.exercise.series + 'x' + this.exercise.repetitions.toString();
  }
}

import {
  Component,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Exercise } from '../../exercise/exercise.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExerciseGroupSelectorComponent } from '../../exercise/exercise-group-selector/exercise-group-selector.component';
import { skip, Subscription } from 'rxjs';
import { ExerciseSelectorComponent } from '../../exercise/exercise-selector/exercise-selector.component';
import { ISelectable } from '../../../shared/interfaces/selectable/selectable';
import { CountdownComponent } from '../../../shared/components/widget/timer/countdown/countdown.component';
import { IInitializable } from '../../../shared/interfaces/initializable';
import { ExtendedArray } from '../../../shared/extensions/extended-array';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SeriesValidatorComponent } from '../../exercise/series-validator/series-validator.component';
import { ExerciseService } from '../../exercise/exercise.service';
import { Precondition } from '../../../shared/utils/precondition';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [
    CommonModule,
    ExerciseGroupSelectorComponent,
    CountdownComponent,
    IconComponent,
    SeriesValidatorComponent,
  ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
})
export class SessionComponent implements IInitializable {
  exercises: Array<Exercise> = [];
  muscleGroups: Array<string> = [];
  selectedExercise: Exercise = ExerciseService.SESSION_EXERCISE_NONE;
  @ViewChild(CountdownComponent) timer!: CountdownComponent;
  private _finishedExercises: ExtendedArray<Exercise> = new ExtendedArray();
  @ViewChild(SeriesValidatorComponent)
  seriesValidator!: SeriesValidatorComponent;

  @ViewChildren(ExerciseGroupSelectorComponent)
  exerciseSelectorGroups!: QueryList<ExerciseGroupSelectorComponent>;
  private _selectionSubscription = new Subscription();
  private _timerEndSubscription = new Subscription();

  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      this.muscleGroups = this.extractDataFromParams<string>(
        params,
        'muscleGroups'
      );
      this.exercises = this.extractDataFromParams<Exercise>(
        params,
        'exercises'
      );
    });
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this._selectionSubscription.unsubscribe();
    this._timerEndSubscription.unsubscribe();
  }

  init(): void {
    Precondition.notNull(
      this.seriesValidator,
      'seriesValidator is null or undefined.'
    );
    Precondition.notNull(this.timer, 'timer is null or undefined.');

    this.exerciseSelectorGroups.forEach(
      (g) =>
        (this._selectionSubscription = g.onSelectionChanged
          .pipe(skip(1))
          .subscribe((selections) => this.handleSelectionChanged(selections)))
    );

    this._timerEndSubscription = this.timer.onEnd.subscribe(() => {
      this.handleTimerEnd();
      this.handleEndOfSession();
    });
  }

  extractDataFromParams<T>(params: Params, paramName: string): Array<T> {
    return params[paramName] ? JSON.parse(params[paramName]) : [];
  }

  getExercisesByMuscleGroup(muscleGroup: string): Array<Exercise> {
    return this.exercises.filter((e) => e.muscleGroup === muscleGroup);
  }

  handleSelectionChanged(selections: Array<ISelectable>): void {
    // This method ignore the event emitted when there are no selections
    if (selections.length === 0) return;

    const selection = selections[0] as ExerciseSelectorComponent;
    this.selectedExercise = selection.exercise;

    this.exerciseSelectorGroups.forEach((g) => g.disable());
    selection.enable();
    selection.select();
    this.timer.setMaxDuration(this.selectedExercise.restTime * 1000, true, () =>
      this.timer.enable()
    );
  }

  private handleTimerEnd(): void {
    this.seriesValidator.validateOneSeries();

    if (!this.seriesValidator.areAllSeriesValidated()) {
      this.timer.setMaxDuration(
        this.selectedExercise.restTime * 1000,
        true,
        () => this.timer.enable()
      );

      return;
    }

    this.handleEndOfExercise();
  }

  private handleEndOfExercise(): void {
    this.exerciseSelectorGroups.forEach((g) => g.enable());

    this._finishedExercises.addUnique(this.selectedExercise);
    this.exerciseSelectorGroups.forEach((g) =>
      g.selectables.filter((s) => {
        if (this._finishedExercises.includes(s.exercise)) s.disable();
      })
    );
    this.selectedExercise = ExerciseService.SESSION_EXERCISE_NONE;
  }

  private handleEndOfSession(): void {
    const areAllExercisesFinished =
      this._finishedExercises.length === this.exercises.length;

    if (!areAllExercisesFinished) return;
    // Redirect to home page or do something about the session that has just been finished
    this._router.navigate(['home']);
  }
}

import {
  Component,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Exercise } from '../../exercise/exercise.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ExerciseSelectorGroupComponent } from '../../exercise/exercise-selector-group/exercise-selector-group.component';
import { skip, Subscription } from 'rxjs';
import { ExerciseSelectorComponent } from '../../exercise/exercise-selector/exercise-selector.component';
import { ISelectable } from '../../../shared/interfaces/selectable/selectable';
import { CountdownComponent } from '../../../shared/components/widget/timer/countdown/countdown.component';
import { IInitializable } from '../../../shared/interfaces/initializable';
import { Precondition } from '../../../shared/utils/precondition';
import { ExtendedArray } from '../../../shared/extensions/extended-array';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SeriesValidatorComponent } from '../../exercise/series-validator/series-validator.component';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [
    CommonModule,
    ExerciseSelectorGroupComponent,
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
  selectedExercise: Exercise | null = null;
  @ViewChild(CountdownComponent) timer!: CountdownComponent;
  private _finishedExercises: ExtendedArray<Exercise> = new ExtendedArray();

  @ViewChildren(ExerciseSelectorGroupComponent)
  exerciseSelectorGroups!: QueryList<ExerciseSelectorGroupComponent>;
  private subscription = new Subscription();

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
    this.subscription.unsubscribe();
  }

  init(): void {
    this.exerciseSelectorGroups.forEach(
      (g) =>
        (this.subscription = g.onSelectionChanged
          .pipe(skip(1))
          .subscribe((selections) => this.handleSelectionChanged(selections)))
    );

    this.timer.onEnd.subscribe(() => {
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
    this.exerciseSelectorGroups.forEach((g) => g.enable());

    if (this.selectedExercise === null) return;

    this._finishedExercises.addUnique(this.selectedExercise);
    this.exerciseSelectorGroups.forEach((g) =>
      g.selectables.filter((s) => {
        if (this._finishedExercises.includes(s.exercise)) s.disable();
      })
    );
    this.selectedExercise = null;
  }

  private handleEndOfSession(): void {
    // if (!condition) return;
    // Redirect to home page or do something about the session that has just been finished
  }
}

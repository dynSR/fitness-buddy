import { Component, inject, ViewChild } from '@angular/core';
import { Exercise } from '../../exercise/exercise.model';
import { ActivatedRoute } from '@angular/router';
import { ExerciseSelectorGroupComponent } from '../../exercise/exercise-selector-group/exercise-selector-group.component';
import { skip, Subscription } from 'rxjs';
import { ExerciseSelectorComponent } from '../../exercise/exercise-selector/exercise-selector.component';
import { ISelectable } from '../../../shared/interfaces/selectable/selectable';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [ExerciseSelectorGroupComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
})
export class SessionComponent {
  exercises: Array<Exercise> = [];
  selectedExercise: Exercise | null = null;

  @ViewChild(ExerciseSelectorGroupComponent)
  exerciseSelectorGroup!: ExerciseSelectorGroupComponent;
  private subscription = new Subscription();

  private readonly _route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      if (params['exercises']) {
        this.exercises = JSON.parse(params['exercises']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.subscription = this.exerciseSelectorGroup.onSelectionChanged
      .pipe(skip(1))
      .subscribe((selections) => this.handleSelectionChanged(selections));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleSelectionChanged(selections: Array<ISelectable>): void {
    if (this.exerciseSelectorGroup === undefined) {
      return;
    }

    const selection = selections[0] as ExerciseSelectorComponent;
    console.log(selection);

    // this.selectedExercise = selection.exercise;
    this.exerciseSelectorGroup.disable();
  }
}

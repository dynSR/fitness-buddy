import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { ExerciseGroupSelectorComponent } from '../../../exercise/exercise-group-selector/exercise-group-selector.component';
import { MuscleGroupService } from '../../../muscle-group/muscle-group.service';
import { ExerciseService } from '../../../exercise/exercise.service';
import { ExtendedArray } from '../../../../shared/extensions/extended-array';
import { Subscription } from 'rxjs';
import { ExerciseSelectorComponent } from '../../../exercise/exercise-selector/exercise-selector.component';
import { BaseModalComponent } from '../../../../shared/components/partial/modal/base-modal/base-modal.component';
import { FilterGroupSelectorComponent } from '../../../../shared/components/filter/filter-group-selector/filter-group-selector.component';
import { Precondition } from '../../../../shared/utils/precondition';
import { FilterSelectorComponent } from '../../../../shared/components/filter/filter-selector/filter-selector.component';
import { Exercise } from '../../../exercise/exercise.model';

@Component({
  selector: 'app-new-session-modal',
  standalone: true,
  imports: [ExerciseGroupSelectorComponent, FilterGroupSelectorComponent],
  templateUrl: './new-session-modal.component.html',
  styleUrls: [
    '../../../../shared/css/modal.css',
    './new-session-modal.component.css',
  ],
})
export class NewSessionModalComponent extends BaseModalComponent {
  @ViewChildren(FilterGroupSelectorComponent)
  filterSelectorGroup!: QueryList<FilterGroupSelectorComponent>;
  @ViewChildren(ExerciseGroupSelectorComponent)
  exerciseSelectorGroups!: QueryList<ExerciseGroupSelectorComponent>;

  private readonly _appliedFilters = new ExtendedArray<string>();

  selectedExercises = new ExtendedArray<Exercise>();
  private readonly _muscleGroupService = inject(MuscleGroupService);
  private readonly _exerciseService = inject(ExerciseService);

  private _filterSelectionSubscription = new Subscription();
  private _exerciseSelectionSubscription = new Subscription();

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy() {
    this._filterSelectionSubscription.unsubscribe();
    this._exerciseSelectionSubscription.unsubscribe();
  }

  /**
   * Initializes the component.
   *
   * Positions the modal based on the "isCentered" input and initializes the modal
   * state.
   *
   * Also, for each exercise selector group, it subscribes to the selections changed
   * event and handles it by calling the "handleSelectionChanged" method.
   */
  override init(): void {
    super.init();

    // Check if relative elements are present in the template [filterSelectorGroup, exerciseSelectorGroups]
    Precondition.notNull(
      this.filterSelectorGroup,
      'filterSelectorGroup is null.'
    );
    Precondition.notNull(
      this.exerciseSelectorGroups,
      'exerciseSelectorGroups is null.'
    );

    this.filterSelectorGroup.forEach(
      (group) =>
        (this._filterSelectionSubscription = group.onSelectionChanged.subscribe(
          (selections) =>
            this.handleFilterSelectionChanged(
              selections as Array<FilterSelectorComponent>
            )
        ))
    );

    // For each groups subscribe to the selections changed event and handle it here
    this.exerciseSelectorGroups.forEach(
      (group) =>
        (this._exerciseSelectionSubscription =
          group.onSelectionChanged.subscribe((selections) =>
            this.handleExerciseSelectionChanged(
              selections as Array<ExerciseSelectorComponent>
            )
          ))
    );
  }

  /**
   * Handles the validation event of the modal.
   * Hides the modal, extracts the selected muscle groups and exercises and navigates to the session page with them.
   * The selected muscle groups and exercises are passed as query parameters to the session page.
   */
  override onValidation(): void {
    super.onValidation();

    // Extract muscle groups.
    const selectedMuscleGroups = new ExtendedArray<string>();
    this.selectedExercises.forEach((e) =>
      selectedMuscleGroups.addUnique(e.muscleGroup)
    );

    // Navigate to the session page with the selected muscle groups and exercises.
    this.router.navigate(['session'], {
      queryParams: {
        muscleGroups: JSON.stringify(selectedMuscleGroups),
        exercises: JSON.stringify(this.selectedExercises),
      },
    });
  }

  get muscleGroups() {
    return this._muscleGroupService.getMuscleGroups();
  }

  hasMuscleGroupExercises(muscleGroup: string): boolean {
    return this.getExercisesByMuscleGroup(muscleGroup).length > 0;
  }

  getExercisesByMuscleGroup(muscleGroup: string) {
    // if (this._appliedFilters.length > 0) {
    //   return this._exerciseService
    //     .getExercisesPerMuscleGroup(muscleGroup)
    //     .filter((e) => this._appliedFilters.includes(e.muscleGroup));
    // }

    return this._exerciseService.getExercisesPerMuscleGroup(muscleGroup);
  }

  handleFilterSelectionChanged(selections: Array<FilterSelectorComponent>) {
    this.filterSelectorGroup.forEach((g) => {
      g.selectables.forEach((s) => {
        if (s.isSelected) {
          this._appliedFilters.addUnique(s.filter);
        } else {
          this._appliedFilters.remove(s.filter);
        }
      });
    });
  }

  handleExerciseSelectionChanged(
    selections: Array<ExerciseSelectorComponent>
  ): void {
    this.exerciseSelectorGroups.forEach((g) => {
      g.selectables.forEach((s) => {
        if (s.isSelected) {
          this.selectedExercises.addUnique(s.exercise);
        } else {
          this.selectedExercises.remove(s.exercise);
        }
      });
    });
  }

  /**
   * Checks if any exercises have been selected.
   *
   * @returns true if at least one exercise has been selected, false otherwise.
   */
  isAtLeastOneExerciseSelected(): boolean {
    return this.selectedExercises.length > 0;
  }

  isExerciseGroupFiltered(muscleGroup: string): boolean {
    if (this._appliedFilters.length === 0) return false;
    return !this._appliedFilters.includes(muscleGroup);
  }

  /**
   * Resets the component to its initial state.
   *
   * If the "toInitialState" parameter is set to true (default), the component will be reset to its initial state.
   * This means that the selected exercises will be cleared and the exercise selector groups will be cleared.
   * Otherwise the modal will only be closed.
   *
   * @param toInitialState Whether to reset the component to its initial state or not.
   */
  override reset(toInitialState: boolean = true): void {
    super.reset();

    if (!toInitialState) return;

    this.selectedExercises.clear();
    this.filterSelectorGroup.forEach((g) => g.clear());
    this.exerciseSelectorGroups.forEach((g) => g.clear());
  }
}

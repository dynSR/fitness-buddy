import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TimeFormatter } from '../../../shared/helpers/time-formatter';
import { Exercise } from '../../../models/exercise.model';
import { MuscleGroupService } from '../../muscle-group/muscle-group.service';
import { ExerciseItemComponent } from '../exercise-item/exercise-item.component';
import { IconTextComponent } from '../../../shared/components/icon/icon-text/icon-text.component';
import { ExerciseService } from '../exercise.service';
import { IsLastIndexOfPipe } from '../../../shared/pipes/is-last-index-of/is-last-index-of.pipe';
import { FilterGroupComponent } from '../../../shared/components/filter/filter-group/filter-group.component';
import { IFilterable } from '../../../shared/interfaces/filterable';
import { IFilter } from '../../../shared/components/filter/filter-item/filter-item.component';
import { BaseSelectableGroup } from '../../../shared/interfaces/selectable/base-selectable-group';

@Component({
  selector: 'app-exercise-group',
  standalone: true,
  imports: [
    CommonModule,
    ExerciseItemComponent,
    IconTextComponent,
    IsLastIndexOfPipe,
    FilterGroupComponent,
  ],
  templateUrl: './exercise-group.component.html',
  styleUrl: './exercise-group.component.css',
})
export class ExerciseGroupComponent
  extends BaseSelectableGroup
  implements IFilterable<string>
{
  @ViewChildren(ExerciseItemComponent)
  override selectables: QueryList<ExerciseItemComponent> = new QueryList();
  @Input({ required: true }) override isInteractable: boolean = false;
  @Input({ required: false }) override canSelectMultiple: boolean = false;

  @ViewChildren('checkboxSelection')
  selectionCheckboxes!: QueryList<ElementRef<HTMLInputElement>>;

  appliedFilters: Array<IFilter<string>> = [];

  readonly timeFormatter = inject(TimeFormatter);
  private readonly _exerciseService = inject(ExerciseService);
  private readonly _muscleGroupService = inject(MuscleGroupService);

  constructor() {
    super();
  }

  override selectOne(selectable: ExerciseItemComponent): void {
    super.selectOne(selectable);

    if (this.canSelectMultiple) {
      const muscleGroup: string = selectable.exercise.muscleGroup;
      // This index is used to find the correct checkbox.
      // As the checkboxes are rendered in the same order as the muscle groups, they share the same index value.
      const muscleGroupIndex: number = this.getMuscleGroups().findIndex(
        (mg) => mg === muscleGroup
      );

      const areAllExercisesOfOneMuscleGroupSelected = this.selectables
        .filter((s) => s.exercise.muscleGroup === muscleGroup)
        .every((s) => s.isSelected);

      const checkbox: HTMLInputElement =
        this.selectionCheckboxes.toArray()[muscleGroupIndex].nativeElement;
      checkbox.checkVisibility();
      checkbox.checked = areAllExercisesOfOneMuscleGroupSelected;
    }
  }

  /**
   * Gets all muscle groups.
   *
   * @returns An array of all muscle group names.
   */
  getMuscleGroups(): Array<string> {
    return this._muscleGroupService.getMuscleGroups();
  }

  /**
   * Gets the muscle groups that are currently visible, after applying the
   * filters from the filter group.
   *
   * @returns An array of muscle group names, filtered by the applied
   *   filters. If there are no filters applied, returns all muscle groups.
   */
  getFilteredMuscleGroups(): Array<string> {
    const areFilterApplied = this.appliedFilters.length > 0;
    if (areFilterApplied) return this.appliedFilters.map((f) => f.value);

    return this.getMuscleGroups();
  }

  /**
   * Filters the exercises by muscle group.
   *
   * @param muscleGroup The muscle group to filter by.
   * @returns An array of exercises belonging to the given muscle group.
   */
  getExercisesByMuscleGroup(muscleGroup: string): Array<Exercise> {
    return this._exerciseService
      .getExercises()
      .filter((exercise) => exercise.muscleGroup === muscleGroup);
  }

  /**
   * Handles the selection event of a checkbox of a muscle group.
   * If there are any unselected exercises of the muscle group, selects all
   * exercises of the muscle group. Otherwise, unselects all exercises of the
   * muscle group.
   *
   * @param muscleGroup The muscle group of the checkbox that was clicked.
   */
  handleCheckboxSelection(muscleGroup: string): void {
    const perMuscleExercises: Array<ExerciseItemComponent> = this.selectables
      .toArray()
      .filter((s) => s.exercise.muscleGroup === muscleGroup);

    if (perMuscleExercises.some((s) => !s.isSelected)) {
      this.selectAll(perMuscleExercises);
      return;
    }

    this.unselectAll(perMuscleExercises);

    // Redefine index of selectables when we uncheck one of the selectionCheckboxes...
    // ...and many are ticked.
    this.selections.forEach((s) => {
      s.setIndex(this.selections.indexOf(s) + 1);
    });
  }

  /**
   * Enables the exercise selection.
   *
   * Sets the component's isInteractive and canSelectMultiple properties to true.
   * Also enables all the selectables in the group by calling their enable method.
   */
  override enable(): void {
    super.enable();
    this.canSelectMultiple = true;
  }

  /**
   * Disables the exercise selection.
   *
   * Sets the component's isInteractable and canSelectMultiple properties to false.
   * Also clears the selections and disables all the selectables in the group by
   * calling their disable method.
   */
  override disable(): void {
    super.disable();
    this.canSelectMultiple = false;
  }

  /**
   * Handles the selection event of a filter group.
   * Updates the appliedFilters property with the filters that are currently
   * selected. The appliedFilters array is used to filter the exercises by
   * muscle group.
   *
   * @param eventData An array of IFilter objects, where each object represents
   *   a filter and its isApplied property indicates whether the filter is
   *   currently applied or not.
   */
  handleFilterSelection(eventData: Array<IFilter<string>>): void {
    this.appliedFilters = eventData.filter((f) => f.isApplied);
    console.log(
      '[handleFilterSelection] - applied filters: ' + this.appliedFilters
    );
  }
}

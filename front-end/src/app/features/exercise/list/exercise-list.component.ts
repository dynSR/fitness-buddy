import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TimeFormatter } from '../../../shared/helpers/time-formatter';
import { MuscleGroupService } from '../../muscle-group/muscle-group.service';
import { IconTextComponent } from '../../../shared/components/icon/icon-text/icon-text.component';
import { ExerciseService } from '../exercise.service';
import { IsLastIndexOfPipe } from '../../../shared/pipes/is-last-index-of/is-last-index-of.pipe';
import { FilterGroupComponent } from '../../../shared/components/filter/filter-group/filter-group.component';
import { IFilterable } from '../../../shared/interfaces/filterable';
import { IFilter } from '../../../shared/components/filter/filter-item/filter-item.component';
import { ExerciseListItemComponent } from './exercise-list-item/exercise-list-item.component';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [
    CommonModule,
    ExerciseListItemComponent,
    IconTextComponent,
    IsLastIndexOfPipe,
    FilterGroupComponent,
  ],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css',
})
export class ExerciseListComponent implements IFilterable<string> {
  appliedFilters: Array<IFilter<string>> = [];

  readonly timeFormatter = inject(TimeFormatter);
  private readonly _exerciseService = inject(ExerciseService);
  private readonly _muscleGroupService = inject(MuscleGroupService);

  constructor() {}

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

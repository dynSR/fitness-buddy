import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TimeFormatter } from '../../../shared/utils/time-formatter';
import { Exercise } from '../../../models/exercise.model';
import { MuscleGroupService } from '../../muscle-group/muscle-group.service';
import { ExerciseCardComponent } from '../exercise-card/exercise-card.component';
import { IconTextComponent } from '../../../shared/components/icon/icon-text/icon-text.component';
import { ExerciseService } from '../exercise.service';
import { SelectableGroup } from '../../../shared/components/selectable/selectable-group';
import { IsLastIndexOfPipe } from '../../../shared/pipes/is-last-index-of/is-last-index-of.pipe';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [
    CommonModule,
    ExerciseCardComponent,
    IconTextComponent,
    IsLastIndexOfPipe,
  ],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css',
})
export class ExerciseListComponent extends SelectableGroup {
  @ViewChildren(ExerciseCardComponent)
  declare selectables: QueryList<ExerciseCardComponent>;
  @Input({ required: true }) override canSelectMultiple: boolean = false;
  @Input({ required: true }) override isInteractive: boolean = false;

  @ViewChildren('checkboxSelection')
  selectionCheckboxes!: QueryList<ElementRef<HTMLInputElement>>;

  readonly timeFormatter = inject(TimeFormatter);
  private readonly _exerciseService = inject(ExerciseService);
  private readonly _muscleGroupService = inject(MuscleGroupService);

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.init();
  }

  override selectOne(selectable: ExerciseCardComponent): void {
    super.selectOne(selectable);

    if (this.canSelectMultiple) {
      const muscleGroup = selectable.exercise.muscleGroup;
      const muscleGroupIndex = this.getMuscleGroups().findIndex(
        (mg) => mg === muscleGroup
      );
      console.log(muscleGroupIndex);

      const areAllExercisesOfOneMuscleGroupSelected: boolean = this.selectables
        .filter((s) => s.exercise.muscleGroup === muscleGroup)
        .every((s) => s.isSelected);

      const checkbox =
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
    const filteredSelectables = this.selectables
      .toArray()
      .filter((s) => s.exercise.muscleGroup === muscleGroup);

    if (filteredSelectables.some((s) => !s.isSelected)) {
      this.selectAll(filteredSelectables);
      return;
    }

    this.unselectAll(filteredSelectables);

    // Redefine index of selectables when we uncheck one of the selectionCheckboxes...
    // ...and many are ticked.
    this.selections.forEach((s) => {
      s.setSelectionIndex(this.selections.indexOf(s) + 1);
    });
  }

  /**
   * Enables the exercise selection.
   *
   * Sets the component's isInteractive and canSelectMultiple properties to true.
   * Also enables all the selectables in the group by calling their enable method.
   */
  enableExerciseSelection(): void {
    this.isInteractive = true;
    this.canSelectMultiple = true;

    this.selectables.forEach((s) => s.enable());
  }

  /**
   * Disables the exercise selection.
   *
   * Sets the component's isInteractive and canSelectMultiple properties to false.
   * Also clears the selections and disables all the selectables in the group by
   * calling their disable method.
   */
  disableExerciseSelection(): void {
    this.isInteractive = false;
    this.canSelectMultiple = false;

    this.clearSelections();
    this.selectables.forEach((s) => s.disable());
  }
}

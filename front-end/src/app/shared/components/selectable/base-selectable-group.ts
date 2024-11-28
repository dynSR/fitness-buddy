import { ElementRef, QueryList } from '@angular/core';
import { ISelectableGroup } from '../../interfaces/selectable/selectable-group';
import { ISelectable } from '../../interfaces/selectable/selectable';
import { IInitializable } from '../../interfaces/initializable';
import { BehaviorSubject, Subject } from 'rxjs';

export class BaseSelectableGroup implements ISelectableGroup<ISelectable> {
  isInteractable: boolean = false;
  canSelectMultiple: boolean = false;
  selectables!: QueryList<ISelectable>;
  selections: Array<ISelectable> = [];
  selectionChanged = new BehaviorSubject<Array<ISelectable>>([]);

  /**
   * Selects one selectable from the group. If the group allows multiple selections or the
   * selectable is already selected, it will toggle the selection. Otherwise it will
   * unselect all the other selectables in the group and select the given one.
   * @param selectable The selectable to select.
   */
  selectOne(selectable: ISelectable): void {
    if (!this.isInteractable) {
      return;
    }

    console.log('[selectOne] - Selectable : ', selectable);

    if (selectable.isSelected) {
      this.removeSelection(selectable);
      return;
    }

    if (!this.canSelectMultiple) {
      this.unselectAll(
        this.selectables.toArray().filter((s) => s !== selectable)
      );
    }

    this.addSelection(selectable);
  }

  /**
   * Selects all the elements in the given array. If the array contains all the
   * selectables, it will select all of them. Otherwise, it will only select the
   * ones that are in the array.
   *
   * @param array The array of selectables to select.
   */
  selectAll(array: Array<ISelectable>): void {
    array.forEach((s) => this.addSelection(s));
    this.selectionChanged.next(array);
  }

  /**
   * Unselects all the selectables in the given array and removes them from the selection pool.
   *
   * @param array The array of selectables to unselect. If the array contains all the
   * selectables, it will unselect all of them. Otherwise, it will only unselect the
   * ones that are in the array.
   */
  unselectAll(array: Array<ISelectable>): void {
    array.forEach((s) => {
      s.unselect();
      this.selections.splice(this.selections.indexOf(s), 1);
    });
    this.selectionChanged.next([]);

    console.log('Selections [cleared] : ', this.selections);
  }

  /**
   * Adds a selectable element to the selections array if it is not already included.
   *
   * Sets the selectionIndex of the selectable to the current number of selections.
   *
   * @param selectable - The Selectable element to be added to the selections.
   */
  addSelection(selectable: ISelectable): void {
    if (this.selections.includes(selectable)) {
      return;
    }

    this.selections.push(selectable);
    selectable.select(this.selections.length);
    this.selectionChanged.next(this.selectables.toArray());

    console.log('Selections [added] : ', this.selections);
  }

  /**
   * Removes a selectable element from the selections array if it is included.
   *
   * Sets the selectionIndex of the selectable to 0.
   *
   * Also, all the selectionIndex of the following selectables are decremented.
   * @param selectable - The Selectable element to be removed from the selections.
   */
  removeSelection(selectable: ISelectable): void {
    if (!this.selections.includes(selectable)) {
      return;
    }

    selectable.unselect();

    const index = this.selections.indexOf(selectable);
    this.selections.splice(index, 1);
    this.selectionChanged.next(this.selectables.toArray());

    // Redefine index of selectables when we uncheck one of the selectionCheckboxes...
    this.selections.forEach((s) => {
      if (s.index > 1 && s.index > index) {
        const value = s.index - 1;
        s.setIndex(value);
      }
    });

    console.log('Selections [removed] : ', this.selections);
  }

  /**
   * Clears all selections, setting the selections array to empty.
   *
   * Logs the updated selections array to the console.
   */
  clearSelections(): void {
    this.unselectAll(this.selections);
    this.selections = [];
    console.log('Selections : ', this.selections);
  }

  /**
   * Handles the selection event of a single selectable element.
   * If the element is not selected, selects it by calling the selectOne method.
   * If the element is already selected, unselects it by calling the selectOne method.
   *
   * @param selectable - The Selectable element that triggered the selection event.
   */
  handleSelectableClicked(selectable: ISelectable): void {
    // console.log('[handleSelectableClicked] - Selectable : ', selectable);
    this.selectOne(selectable);
  }

  /**
   * Handles the selection event of a checkbox of a muscle group.
   * If there are any unselected exercises of the muscle group, selects all
   * exercises of the muscle group. Otherwise, unselects all exercises of the
   * muscle group.
   *
   * @param muscleGroup The muscle group of the checkbox that was clicked.
   */
  handleSelectionCheckboxClicked(): void {
    const selectables: Array<ISelectable> = this.selectables.toArray();
    if (selectables.some((s) => !s.isSelected)) {
      this.selectAll(selectables);
      return;
    }

    this.unselectAll(selectables);
    // Redefine index of selectables when we uncheck one of the selectionCheckboxes...
    // ...and many are ticked.
    this.selections.forEach((s) => {
      s.setIndex(this.selections.indexOf(s) + 1);
    });
  }

  /**
   * Enables all the selectables in the group.
   *
   * Sets the component's isInteractable property to true.
   * Calls the enable method of each of the selectables in the group.
   */
  enable(): void {
    this.isInteractable = true;
    this.selectables.forEach((s) => s.enable());
  }

  /**
   * Disables all the selectables in the group.
   *
   * Sets the component's isInteractable property to false.
   * Clears the selections array.
   * Calls the disable method of each of the selectables in the group.
   */
  disable(): void {
    this.isInteractable = false;
    this.clearSelections();
    this.selectables.forEach((s) => s.disable());
  }
}

import { ElementRef, QueryList } from '@angular/core';
import { ISelectable, Selectable } from './selectable';

export interface ISelectableGroup<T extends ISelectable> {
  selectables: QueryList<T>;
  isInteractive: boolean;
  canSelectMultiple: boolean;
  selections: Array<T>;

  init(): void;

  selectOne(selectable: T): void;
  selectAll(array: Array<T>): void;
  unselectAll(array: Array<T>): void;

  addSelection(selectable: T): void;
  removeSelection(selectable: T): void;
  clearSelections(): void;

  handleClickOnSelectable(eventData: ISelectable): void;
}
export class SelectableGroup implements ISelectableGroup<Selectable> {
  selectables!: QueryList<Selectable>;
  isInteractive: boolean = false;
  canSelectMultiple: boolean = false;
  selections: Array<Selectable> = [];

  /**
   * Initializes all the selectables in the group by calling the init method of each
   * of them. This method is called once the group is created, and it is the only time
   * the init method is called, as it is not called when the group is updated.
   */
  init(): void {
    this.selectables.forEach((s) => s.init());
  }

  /**
   * Selects one selectable from the group. If the group allows multiple selections or the
   * selectable is already selected, it will toggle the selection. Otherwise it will
   * unselect all the other selectables in the group and select the given one.
   * @param selectable The selectable to select.
   */
  selectOne(selectable: Selectable): void {
    if (this.canSelectMultiple || selectable.isSelected) {
      const handleSelection = selectable.isSelected
        ? () => this.addSelection(selectable)
        : () => this.removeSelection(selectable);
      handleSelection();
      return;
    }

    this.unselectAll(this.selectables.toArray());
    this.addSelection(selectable);
  }

  /**
   * Selects all the elements in the given array. If the array contains all the
   * selectables, it will select all of them. Otherwise, it will only select the
   * ones that are in the array.
   *
   * @param array The array of selectables to select.
   */
  selectAll(array: Array<Selectable>): void {
    array.forEach((s) => {
      if (s instanceof Selectable) {
        s.select();
        this.addSelection(s);
      }
    });
  }

  /**
   * Unselects all the selectables in the given array and removes them from the selection pool.
   *
   * @param array The array of selectables to unselect. If the array contains all the
   * selectables, it will unselect all of them. Otherwise, it will only unselect the
   * ones that are in the array.
   */
  unselectAll(array: Array<Selectable>): void {
    array.forEach((s) => {
      if (s instanceof Selectable) {
        s.unselect();
        this.selections.splice(this.selections.indexOf(s), 1);
      }
    });

    console.log(this.selections);
  }

  /**
   * Adds a selectable element to the selections array if it is not already included.
   *
   * Sets the selectionIndex of the selectable to the current number of selections.
   *
   * @param selectable - The Selectable element to be added to the selections.
   */
  addSelection(selectable: Selectable): void {
    if (this.selections.includes(selectable)) {
      return;
    }

    this.selections.push(selectable);
    selectable.selectionIndex = this.selections.length;
    console.log('Selections : ', this.selections);
  }

  /**
   * Removes a selectable element from the selections array if it is included.
   *
   * Sets the selectionIndex of the selectable to 0.
   *
   * Also, all the selectionIndex of the following selectables are decremented.
   * @param selectable - The Selectable element to be removed from the selections.
   */
  removeSelection(selectable: Selectable): void {
    selectable.selectionIndex = 0; // 0 means unselected

    const index = this.selections.indexOf(selectable);
    this.selections.splice(index, 1);

    this.selections.forEach((s) => {
      if (s.selectionIndex > 1 && s.selectionIndex > index) {
        s.selectionIndex--;
      }
    });

    console.log('Selections : ', this.selections);
  }

  /**
   * Clears all selections, setting the selections array to empty.
   *
   * Logs the updated selections array to the console.
   */
  clearSelections(): void {
    this.selections = [];
    console.log('Selections : ', this.selections);
  }

  /**
   * Handles the click event on a selectable element.
   *
   * @param eventData - The ISelectable element that was clicked.
   *
   * Calls selectOne with the clicked element to add it to the selection pool.
   * Sets the selectionIndex of the element to the current number of selections.
   * Logs the updated selections array to the console.
   */
  handleClickOnSelectable(eventData: ISelectable): void {
    // console.log(eventData);
    this.selectOne(eventData as Selectable);
    eventData.setSelectionIndex(this.selections.length);
    console.log(this.selections);
  }
}

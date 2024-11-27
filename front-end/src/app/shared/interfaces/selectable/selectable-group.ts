import { QueryList } from '@angular/core';
import { IInteractable } from '../interactable';
import { ISelectable } from './selectable';

export interface ISelectableGroup<T extends ISelectable> extends IInteractable {
  canSelectMultiple: boolean;
  selectables: QueryList<T>;
  selections: Array<T>;

  selectOne(selectable: T): void;
  selectAll(array: Array<T>): void;
  unselectAll(array: Array<T>): void;

  addSelection(selectable: T): void;
  removeSelection(selectable: T): void;
  clearSelections(): void;

  handleSelectableClicked(selectable: T): void;
}

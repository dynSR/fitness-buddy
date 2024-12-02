import { ElementRef, QueryList } from '@angular/core';
import { IInteractable } from '../interactable';
import { ISelectable } from './selectable';
import { Subject } from 'rxjs';
import { IInitializable } from '../initializable';
import { ExtendedArray } from '../../extensions/extended-array';

export interface ISelectableGroup<T extends ISelectable>
  extends IInteractable,
    IInitializable {
  canSelectMultiple: boolean;
  selectables: QueryList<T>;
  selections: ExtendedArray<T>;
  checkbox?: ElementRef<HTMLInputElement>;
  onSelectionChanged: Subject<Array<T>>;

  selectOne(selectable: T): void;
  selectAll(array: Array<T>): void;
  unselectAll(array: Array<T>): void;

  addSelection(selectable: T): void;
  removeSelection(selectable: T): void;
  clearSelections(): void;

  handleSelectableClicked(selectable: T): void;
  handleSelectionCheckboxClicked(): void;
}

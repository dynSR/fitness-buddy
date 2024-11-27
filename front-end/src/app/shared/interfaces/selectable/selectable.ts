import { ElementRef, EventEmitter } from '@angular/core';
import { IInteractable } from '../interactable';
import { IIndexable } from '../indexable';
import { IInitializable } from '../initializable';

export interface ISelectable extends IInitializable, IInteractable, IIndexable {
  element?: ElementRef<HTMLElement>;
  isSelected: boolean;

  unselectedClassName: string;
  selectedClassName: string;
  disabledClassName: string;

  select(index: number): void;
  unselect(): void;

  onSelectableClicked: EventEmitter<ISelectable>;
}

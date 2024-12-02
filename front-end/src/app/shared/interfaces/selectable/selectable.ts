import { ElementRef, EventEmitter } from '@angular/core';
import { IInteractable } from '../interactable';
import { IInitializable } from '../initializable';

export interface ISelectable extends IInitializable, IInteractable {
  elementRef?: ElementRef<HTMLDivElement>;
  isSelected: boolean;

  unselectedClassName: string;
  selectedClassName: string;
  disabledClassName: string;

  select(): void;
  unselect(): void;

  onSelectableClicked: EventEmitter<ISelectable>;
}

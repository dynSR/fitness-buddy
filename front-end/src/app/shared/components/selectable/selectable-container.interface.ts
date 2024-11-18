import { BaseSelectable } from './base-selectable';
import { QueryList } from '@angular/core';

export interface SelectableContainer<T extends BaseSelectable> {
  selectables: QueryList<T>;
  canSelectMultiple: boolean;
  isInteractive: boolean;
  // selections: Array<T>;

  init(): void;

  selectOne(selectable: T): void;
  selectAll(): void;

  unselectAll(): void;
}

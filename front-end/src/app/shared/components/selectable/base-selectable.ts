import { ElementRef } from '@angular/core';

export interface Selectable {
  element: ElementRef;
  isSelected: boolean;

  unselectedClassName: string;
  selectedClassName: string;

  select(): void;
  unselect(): void;
  toggle(): void;
}

export class BaseSelectable implements Selectable {
  element!: ElementRef;

  parent: Element | null = null;
  isSelected: boolean = false;

  unselectedClassName: string = 'selectable--idle';
  selectedClassName: string = 'selectable--selected';

  constructor() {}

  select(): void {
    if (this.isSelected) {
      return;
    }

    if (
      this.element.nativeElement.classList.replace(
        this.unselectedClassName,
        this.selectedClassName
      )
    ) {
      this.isSelected = true;
    }
  }

  unselect(): void {
    if (!this.isSelected) {
      return;
    }

    if (
      this.element.nativeElement.classList.replace(
        this.selectedClassName,
        this.unselectedClassName
      )
    ) {
      this.isSelected = false;
    }
  }

  toggle(): void {
    if (this.isSelected) {
      this.unselect();
      return;
    }

    this.select();
  }
}

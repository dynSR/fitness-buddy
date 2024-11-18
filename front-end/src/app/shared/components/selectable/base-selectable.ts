import { ElementRef } from '@angular/core';

export interface Selectable {
  element: ElementRef;
  isSelected: boolean;
  canBeSelected: boolean;

  unselectedClassName: string;
  selectedClassName: string;

  select(): void;
  unselect(): void;
  toggle(): void;

  enable(): void;
  disable(): void;
}

export class BaseSelectable implements Selectable {
  element!: ElementRef;

  parent: Element | null = null;
  isSelected: boolean = false;
  canBeSelected!: boolean;

  unselectedClassName: string = 'selectable--idle';
  selectedClassName: string = 'selectable--selected';
  disabledClassName: string = 'selectable--disabled';

  constructor() {}

  select(): void {
    if (!this.canBeSelected || this.isSelected) {
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
    if (!this.canBeSelected || !this.isSelected) {
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
    if (!this.canBeSelected) {
      return;
    }

    if (this.isSelected) {
      this.unselect();
      return;
    }

    this.select();
  }

  enable(): void {
    this.element.nativeElement.classList.remove([
      this.unselectedClassName,
      this.selectedClassName,
      this.disabledClassName,
    ]);

    this.element.nativeElement.classList.add(this.unselectedClassName);
  }

  disable(): void {
    this.element.nativeElement.classList.remove([
      this.unselectedClassName,
      this.selectedClassName,
    ]);

    this.element.nativeElement.classList.add(this.disabledClassName);
  }
}

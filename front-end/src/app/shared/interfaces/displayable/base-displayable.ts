import { ElementRef } from '@angular/core';
import { IDisplayable } from './displayable';
import { IInitializable } from '../initializable';
import { Precondition } from '../../utils/precondition';

export class BaseDisplayable implements IInitializable, IDisplayable {
  element?: ElementRef<HTMLDivElement>;

  isDisplayable: boolean = true;
  isDisplayed: boolean = false;

  displayedClassName!: string;
  hiddenClassName!: string;

  constructor() {}

  init(): void {
    if (!this.isDisplayed) {
      this.hide();
    } else {
      this.display();
    }
  }

  display(): void {
    if (!this.isDisplayable) return;

    Precondition.notNull(
      this.element,
      'element not found, could not change classes.'
    );

    if (
      this.element.nativeElement.classList.replace(
        this.hiddenClassName,
        this.displayedClassName
      )
    ) {
      this.isDisplayed = true;
      console.log(
        '[Display] - element displayed successfully',
        this.element.nativeElement.classList
      );
    }
  }

  hide(): void {
    Precondition.notNull(
      this.element,
      'element not found, could not change classes.'
    );

    if (
      this.element.nativeElement.classList.replace(
        this.displayedClassName,
        this.hiddenClassName
      )
    ) {
      this.isDisplayed = false;
      console.log(
        '[Hide] - element hidden successfully',
        this.element.nativeElement.classList
      );
    }
  }
}

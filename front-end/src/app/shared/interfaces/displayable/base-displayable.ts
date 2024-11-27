import { ElementRef } from '@angular/core';
import { IDisplayable } from './displayable';
import { IInitializable } from '../initializable';

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
    if (!this.isDisplayable || this.element === undefined) {
      console.error(
        '[Display] - element not found, could not change classes' +
          '\n Or the element is not displayable.'
      );
      return;
    }

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
    if (this.element === undefined) {
      console.error('[Hide] - element not found, could not change classes');
      return;
    }

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

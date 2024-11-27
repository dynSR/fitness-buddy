import { ElementRef } from '@angular/core';

export interface IDisplayable {
  element?: ElementRef<HTMLElement>;
  isDisplayable: boolean;
  isDisplayed: boolean;

  displayedClassName: string;
  hiddenClassName: string;

  display(): void;
  hide(): void;
}

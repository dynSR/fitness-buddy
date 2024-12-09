import { ElementRef } from '@angular/core';

export interface IModal {
  title: string;
  description: string;
  btnTitle: string;
  isCentered: boolean;

  cancelMessage: string;
  validationMessage: string;
  cancelBtn?: ElementRef<HTMLButtonElement>;
  validationBtn?: ElementRef<HTMLButtonElement>;

  setPosition(isCentered: boolean): void;
  onValidation(action?: () => void): void;
  reset(toInitialState: boolean): void;
}

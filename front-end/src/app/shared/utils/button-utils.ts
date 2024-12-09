import { ElementRef } from '@angular/core';

export class ButtonUtils {
  public static isDisabled(
    button: HTMLButtonElement | ElementRef<HTMLButtonElement>
  ): boolean {
    if (button instanceof HTMLButtonElement) return button.disabled;
    return button.nativeElement.disabled;
  }

  public static setDisabled(
    button: HTMLButtonElement | ElementRef<HTMLButtonElement>,
    isDisabled: boolean
  ): void {
    if (button instanceof HTMLButtonElement) button.disabled = isDisabled;
    else button.nativeElement.disabled = isDisabled;
  }

  public static setText(
    button: HTMLButtonElement | ElementRef<HTMLButtonElement>,
    text: string
  ): void {
    if (button instanceof HTMLButtonElement) button.textContent = text;
    else button.nativeElement.textContent = text;
  }

  public static setFocus(
    button: HTMLButtonElement | ElementRef<HTMLButtonElement>
  ): void {
    if (button instanceof HTMLButtonElement) button.focus();
    else button.nativeElement.focus();
  }
}

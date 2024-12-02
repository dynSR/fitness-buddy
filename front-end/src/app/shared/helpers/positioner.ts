import { Injectable } from '@angular/core';
import { Precondition } from '../utils/precondition';

@Injectable({ providedIn: 'root' })
export class Positioner {
  centerElementOnXAxis(element: HTMLElement): void {
    Precondition.notNull(element, '[CenterElement] - element is not found.');

    const rect = element.getBoundingClientRect();
    const left = `calc(50dvw - ${rect.width / 2}px)`;
    element.style.left = left;
  }

  centerElementOnYAxis(element: HTMLElement): void {
    Precondition.notNull(element, '[CenterElement] - element is not found.');

    const rect = element.getBoundingClientRect();
    const top = `calc(50dvh - ${rect.height / 2}px)`;
    element.style.top = top;
  }

  centerElement(element: HTMLElement): void {
    this.centerElementOnXAxis(element);
    this.centerElementOnYAxis(element);
  }
}

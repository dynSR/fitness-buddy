import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Positioner {
  centerElementOnXAxis(element: HTMLElement): void {
    if (element === undefined) {
      console.error('[CenterElement] - element not found');
      return;
    }

    const rect = element.getBoundingClientRect();
    const left = `calc(50dvw - ${rect.width / 2}px)`;
    element.style.left = left;
  }

  centerElementOnYAxis(element: HTMLElement): void {
    if (element === undefined) {
      console.error('[CenterElement] - element not found');
      return;
    }

    const rect = element.getBoundingClientRect();
    const top = `calc(50dvh - ${rect.height / 2}px)`;
    element.style.top = top;
  }

  centerElement(element: HTMLElement): void {
    this.centerElementOnXAxis(element);
    this.centerElementOnYAxis(element);
  }
}

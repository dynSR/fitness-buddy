import { ElementRef } from '@angular/core';

export class SelectableContainer {
  protected container!: ElementRef<HTMLDivElement>;

  private _selectables: Array<Element> = [];
  private _activeElement: Element | null = null;

  private readonly selectedClassName = 'selectable--active';
  private readonly notSelectedClassName = 'selectable';

  get selectables(): Array<Element> {
    return this._selectables;
  }

  get activeElement(): Element | null {
    return this._activeElement;
  }

  constructor() {}

  protected init(container: ElementRef): void {
    Array.from(container.nativeElement.children).forEach((child) => {
      // TS: cast from unknown to Element type
      let element = child as Element;
      console.log(element);

      Array.from(element.children).forEach((element) =>
        this.selectables.push(element)
      );

      if (!element.classList.contains(this.notSelectedClassName)) {
        return;
      }

      this.selectables.push(child as Element);
    });

    this.selectables.forEach((selectable) => {
      selectable.addEventListener('click', () => {
        this.unselectAll();
        this.selectOne(selectable);
      });
    });

    console.log(this.selectables);
  }

  selectOne(element: Element): void {
    // In case the element is already selected
    if (element.classList.contains(this.selectedClassName)) {
      return;
    }

    element.classList.replace(
      this.notSelectedClassName,
      this.selectedClassName
    );
    this._activeElement = element;
  }
  unselectAll(): void {
    this._selectables.forEach((element) => {
      // In case the element is already not selected
      if (element.classList.contains(this.notSelectedClassName)) {
        return;
      }

      element.classList.replace(
        this.selectedClassName,
        this.notSelectedClassName
      );
    });
  }
}

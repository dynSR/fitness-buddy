import { ElementRef, EventEmitter } from '@angular/core';

export interface ISelectable {
  element: ElementRef;
  isSelected: boolean;
  canBeSelected: boolean;
  unselectedClassName: string;
  selectedClassName: string;

  indexElement?: ElementRef;
  selectionIndex: number;
  indexIdleClassName: string;
  indexDisplayedClassName: string;

  init(): void;

  select(): void;
  unselect(): void;
  toggle(): void;

  onClickEmitter: EventEmitter<ISelectable>;
  handleOnClick(): void;

  enable(): void;
  disable(): void;

  setSelectionIndex(index: number): void;
  toggleSelectionIndexVisibility(): void;
}

export class Selectable implements ISelectable {
  element!: ElementRef;
  isSelected: boolean = false;
  canBeSelected!: boolean;

  unselectedClassName: string = 'selectable--idle';
  selectedClassName: string = 'selectable--selected';
  disabledClassName: string = 'selectable--disabled';

  indexElement?: ElementRef;
  selectionIndex: number = 0;
  indexIdleClassName: string = 'selectable-index--idle';
  indexDisplayedClassName: string = 'selectable-index--displayed';

  onClickEmitter: EventEmitter<ISelectable> = new EventEmitter<ISelectable>();

  constructor() {}

  /**
   * Initializes the selectable element.
   *
   * Attaches a click event to the selectable element. If the element
   * can be selected, it is enabled by default. Otherwise it is disabled.
   */
  init(): void {
    // Assign the click event independently of canBeSelected
    this.element.nativeElement.addEventListener('click', () =>
      this.handleOnClick()
    );

    // Set default state based on canBeSelected
    if (!this.canBeSelected) {
      this.disable();
      return;
    }
    this.enable();
  }

  /**
   * Selects the element if it can be selected and is not already selected.
   * Updates the element's class from unselected to selected and marks it as selected.
   * Also updates the selection index to reflect the new state.
   */
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
      this.toggleSelectionIndexVisibility();
    }
  }

  /**
   * Unselects the element if it can be unselected and is already selected.
   * Updates the element's class from selected to unselected and marks it as unselected.
   * Also updates the selection index to reflect the new state.
   */
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
      this.toggleSelectionIndexVisibility();
    }
  }

  /**
   * Toggles the selectable element between selected and unselected states.
   * If the element is currently selected, it will be unselected.
   * If the element is currently unselected, it will be selected.
   */
  toggle(): void {
    if (this.isSelected) {
      this.unselect();
      return;
    }

    this.select();
  }

  /**
   * Handles the click event on the selectable element.
   * Toggles the selected state of the element by calling the toggle method.
   */
  handleOnClick(): void {
    console.log('click');
    this.toggle();
    this.onClickEmitter.emit(this as ISelectable);
  }

  /**
   * Enables the selectable element, allowing it to be selected or deselected.
   * Removes the disabled class and adds either the selected or unselected class
   * depending on the current state of the element.
   */
  enable(): void {
    this.canBeSelected = true;
    this.element.nativeElement.classList.remove(this.disabledClassName);

    const className = this.isSelected
      ? this.selectedClassName
      : this.unselectedClassName;
    this.element.nativeElement.classList.add(className);
  }

  /**
   * Disables the selectable element, preventing it from being selected or deselected.
   * Removes any classes indicating the element is selected or unselected and adds the
   * disabled class. Also sets the canBeSelected and isSelected properties to false.
   */
  disable(): void {
    this.unselect();
    this.canBeSelected = false;

    this.setSelectionIndex(0);
    this.toggleSelectionIndexVisibility();

    this.element.nativeElement.classList.remove(this.unselectedClassName);
    this.element.nativeElement.classList.add(this.disabledClassName);
  }

  setSelectionIndex(index: number) {
    this.selectionIndex = index;
  }

  toggleSelectionIndexVisibility(): void {
    if (!this.indexElement) {
      return;
    }

    if (this.isSelected) {
      this.indexElement.nativeElement.classList.replace(
        this.indexIdleClassName,
        this.indexDisplayedClassName
      );

      return;
    }

    this.indexElement.nativeElement.classList.replace(
      this.indexDisplayedClassName,
      this.indexIdleClassName
    );
  }
}

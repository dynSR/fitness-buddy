import { ElementRef, EventEmitter } from '@angular/core';
import { IInteractable } from '../../interfaces/interactable';

export interface ISelectable extends IInteractable {
  element: ElementRef;

  isSelectable: boolean;
  isSelected: boolean;

  unselectedClassName: string;
  selectedClassName: string;

  isIndexVisible: boolean;
  indexElement?: ElementRef;
  selectionIndex: number;

  indexIdleClassName: string;
  indexDisplayedClassName: string;

  init(): void;

  select(): void;
  unselect(): void;
  toggle(): void;

  onSelectableClickEmitter: EventEmitter<ISelectable>;

  setSelectionIndex(index: number): void;
  toggleSelectionIndexVisibility(): void;
}

export class Selectable implements ISelectable {
  isInteractable: boolean = true;

  element!: ElementRef;
  isSelectable: boolean = false;
  isSelected: boolean = false;

  unselectedClassName: string = 'selectable--idle';
  selectedClassName: string = 'selectable--selected';
  disabledClassName: string = 'selectable--disabled';

  isIndexVisible: boolean = false;
  indexElement?: ElementRef;
  selectionIndex: number = 0;
  indexIdleClassName: string = 'selectable-index--idle';
  indexDisplayedClassName: string = 'selectable-index--displayed';

  onSelectableClickEmitter: EventEmitter<ISelectable> =
    new EventEmitter<ISelectable>();

  constructor() {}

  /**
   * Initializes the selectable element.
   *
   * Attaches a click event to the selectable element. If the element
   * can be selected, it is enabled by default. Otherwise it is disabled.
   */
  init(): void {
    // Assign the click event independently of canBeSelected
    this.element.nativeElement.addEventListener('click', () => {
      this.toggle();
      this.onSelectableClickEmitter.emit(this as ISelectable);
    });

    // Set default state based on canBeSelected
    if (!this.isSelectable) {
      this.disable();
      return;
    }

    this.enable();
  }

  /**
   * Selects the selectable element.
   *
   * If the element is not selected, selects it by replacing the
   * unselected class with the selected class. Also sets the
   * isSelected property to true and makes the index visible.
   */
  select(): void {
    if (this.isSelected) {
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
   * Unselects the selectable element.
   *
   * If the element is selected, it replaces the selected class with
   * the unselected class, sets the isSelected property to false,
   * and toggles the visibility of the selection index.
   */
  unselect(): void {
    if (!this.isSelected) {
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
   */
  toggle(): void {
    if (this.isSelected) {
      this.unselect();
      return;
    }

    this.select();
  }

  setSelectionIndex(index: number) {
    this.selectionIndex = index;
  }

  toggleSelectionIndexVisibility(): void {
    if (
      this.indexElement === undefined ||
      !this.isIndexVisible ||
      !this.isSelectable
    ) {
      return;
    }

    // console.log('toggleSelectionIndexVisibility()');

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
    this.setSelectionIndex(0);
  }

  /**
   * Enables the selectable element, allowing it to be selected or deselected.
   * Removes the disabled class and adds either the selected or unselected class
   * depending on the current state of the element.
   */
  enable(): void {
    this.isInteractable = true;

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
    this.isInteractable = false;
    this.unselect();

    this.setSelectionIndex(0);
    this.toggleSelectionIndexVisibility();

    this.element.nativeElement.classList.remove(this.unselectedClassName);
    this.element.nativeElement.classList.add(this.disabledClassName);
  }
}

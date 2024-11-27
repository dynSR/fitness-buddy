import { ElementRef, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISelectable } from './selectable';
import { IInitializable } from '../initializable';

export class BaseSelectable implements IInitializable, ISelectable {
  isInteractable: boolean = true;

  element?: ElementRef<HTMLDivElement> = undefined;
  isSelected: boolean = false;

  unselectedClassName: string = 'selectable--idle';
  selectedClassName: string = 'selectable--selected';
  disabledClassName: string = 'selectable--disabled';

  onSelectableClicked: EventEmitter<ISelectable> =
    new EventEmitter<ISelectable>();

  index: number = 0;
  onIndexValueChangeEvent: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  constructor() {}

  /**
   * Initializes the selectable element.
   *
   * If the element can be selected, it is enabled by default. Otherwise it is disabled.
   */
  init(): void {
    if (this.element === undefined) {
      console.error('[Init] - element not found');
      return;
    }

    this.element.nativeElement.addEventListener('click', () =>
      this.onSelectableClicked.emit(this as ISelectable)
    );

    // Set default state based on canBeSelected
    if (!this.isInteractable) {
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
  select(index: number): void {
    if (this.element === undefined) {
      console.error('[Selection] - element not found');
      return;
    }

    if (this.isSelected) {
      return;
    }

    if (
      !this.element.nativeElement.classList.replace(
        this.unselectedClassName,
        this.selectedClassName
      )
    ) {
      console.error('[Selection] - Could not change classes');
      return;
    }

    this.isSelected = true;
    this.setIndex(index);

    console.log('[Selection] - selected successfully');
  }

  /**
   * Unselects the selectable element.
   *
   * If the element is selected, it replaces the selected class with
   * the unselected class, sets the isSelected property to false,
   * and toggles the visibility of the selection index.
   */
  unselect(): void {
    if (this.element === undefined) {
      console.error('[Unselection] - element not found');
      return;
    }

    if (!this.isSelected) {
      return;
    }

    if (
      !this.element.nativeElement.classList.replace(
        this.selectedClassName,
        this.unselectedClassName
      )
    ) {
      console.error('[Unselection] - Could not change classes');
      return;
    }

    this.isSelected = false;
    this.setIndex(0);
  }

  /**
   * Enables the selectable element, allowing it to be selected or deselected.
   * Removes the disabled class and adds either the selected or unselected class
   * depending on the current state of the element.
   */
  enable(): void {
    if (this.element === undefined) {
      console.error('[Enable] - element not found');
      return;
    }

    this.isInteractable = true;
    this.element.nativeElement.classList.remove(this.disabledClassName);
  }

  /**
   * Disables the selectable element, preventing it from being selected or deselected.
   * Removes any classes indicating the element is selected or unselected and adds the
   * disabled class. Also sets the canBeSelected and isSelected properties to false.
   */
  disable(): void {
    if (this.element === undefined) {
      console.error('[Disable] - element not found');
      return;
    }

    this.isInteractable = false;
    this.unselect();

    this.element.nativeElement.classList.remove(this.unselectedClassName);
    this.element.nativeElement.classList.add(this.disabledClassName);
  }

  setIndex(newValue: number): void {
    this.index = newValue;
    this.onIndexValueChangeEvent.next(this.index);
  }
}

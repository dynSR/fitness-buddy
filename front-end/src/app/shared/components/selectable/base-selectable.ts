import { ElementRef, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISelectable } from '../../interfaces/selectable/selectable';
import { IInitializable } from '../../interfaces/initializable';
import { Precondition } from '../../utils/precondition';

export class BaseSelectable implements IInitializable, ISelectable {
  isInteractable: boolean = true;

  elementRef?: ElementRef<HTMLDivElement> = undefined;
  isSelected: boolean = false;

  unselectedClassName: string = 'selectable--idle';
  selectedClassName: string = 'selectable--selected';
  disabledClassName: string = 'selectable--disabled';

  onSelectableClicked: EventEmitter<ISelectable> =
    new EventEmitter<ISelectable>();

  constructor() {}

  /**
   * Initializes the selectable element.
   *
   * If the element can be selected, it is enabled by default. Otherwise it is disabled.
   */
  init(): void {
    Precondition.notNull(this.elementRef, '[Init] - element is not found');

    this.elementRef.nativeElement.addEventListener('click', () =>
      this.onSelectableClicked.emit(this as ISelectable)
    );

    // Set default state based on isInteractable
    if (!this.isInteractable) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /**
   * Selects the selectable element.
   *
   * If the element is not selected, selects it by replacing the
   * unselected class with the selected class. Also sets the
   * isSelected property to true and makes the index visible.
   */
  select(): void {
    Precondition.notNull(this.elementRef, '[Selection] - element is not found');

    if (!this.isInteractable || this.isSelected) {
      return;
    }

    if (
      this.elementRef.nativeElement.classList.replace(
        this.unselectedClassName,
        this.selectedClassName
      )
    ) {
      this.isSelected = true;
      console.log('[Selection] - selected successfully');
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
    Precondition.notNull(
      this.elementRef,
      '[Unselection] - element is not found'
    );

    if (!this.isSelected) {
      return;
    }

    if (
      this.elementRef.nativeElement.classList.replace(
        this.selectedClassName,
        this.unselectedClassName
      )
    ) {
      this.isSelected = false;
      console.log('[Unselection] - unselected successfully');
    }
  }

  /**
   * Enables the selectable element, allowing it to be selected or deselected.
   * Removes the disabled class and adds either the selected or unselected class
   * depending on the current state of the element.
   */
  enable(): void {
    Precondition.notNull(this.elementRef, '[Enable] - element is not found');

    this.isInteractable = true;
    if (
      !this.elementRef.nativeElement.classList.replace(
        this.disabledClassName,
        this.unselectedClassName
      )
    ) {
      this.elementRef.nativeElement.classList.add(this.unselectedClassName);
    }
  }

  /**
   * Disables the selectable element, preventing it from being selected or deselected.
   * Removes any classes indicating the element is selected or unselected and adds the
   * disabled class. Also sets the canBeSelected and isSelected properties to false.
   */
  disable(): void {
    Precondition.notNull(this.elementRef, '[Disable] - element is not found');

    this.isInteractable = false;
    this.unselect();

    if (
      this.elementRef.nativeElement.classList.replace(
        this.unselectedClassName,
        this.disabledClassName
      )
    ) {
      this.elementRef.nativeElement.classList.add(this.disabledClassName);
    }
  }
}

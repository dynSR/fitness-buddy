import { ElementRef, inject } from '@angular/core';
import { BaseDisplayable } from '../../../interfaces/displayable/base-displayable';
import { IModal } from '../../../interfaces/modal';
import { Precondition } from '../../../utils/precondition';
import { Positioner } from '../../../helpers/positioner';

export abstract class AbstractModal extends BaseDisplayable implements IModal {
  title: string = '';
  description: string = '';
  btnTitle: string = '';
  isCentered: boolean = true;

  cancelMessage: string = '';
  validationMessage: string = '';
  cancelBtn?: ElementRef<HTMLButtonElement>;
  validationBtn?: ElementRef<HTMLButtonElement>;

  protected readonly positioner = inject(Positioner);

  constructor() {
    super();
  }

  override init(): void {
    this.setPosition(this.isCentered);
    super.init();
  }

  setPosition(isCentered: boolean): void {
    Precondition.notNull(
      this.element,
      '[PositionModal] - element is not found, could not position.'
    );

    const modalContent: HTMLDivElement = this.element.nativeElement
      .firstChild as HTMLDivElement;
    this.positioner.centerElementOnXAxis(modalContent);

    if (!isCentered) {
      modalContent.style.marginTop = '2rem';
    } else {
      this.positioner.centerElementOnYAxis(modalContent);
    }
  }

  abstract onValidation(action?: () => void): void;
  abstract reset(toInitialState: boolean): void;
}

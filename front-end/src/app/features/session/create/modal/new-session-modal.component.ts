import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { IModal } from '../../../../shared/interfaces/modal';
import { Positioner } from '../../../../shared/helpers/positioner';
import { BaseDisplayable } from '../../../../shared/interfaces/displayable/base-displayable';

@Component({
  selector: 'app-new-session-modal',
  standalone: true,
  imports: [],
  templateUrl: './new-session-modal.component.html',
  styleUrls: [
    '../../../../shared/css/modal.css',
    './new-session-modal.component.css',
  ],
})
export class NewSessionModalComponent
  extends BaseDisplayable
  implements IModal
{
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) btnTitle!: string;
  @Input({ required: false }) isCentered: boolean = true;
  @Input({ required: true }) cancelBtnText!: string;
  @Input({ required: true }) validateBtnText!: string;

  @ViewChild('modal') override element?: ElementRef<HTMLDivElement> = undefined;

  override displayedClassName: string = 'modal--displayed';
  override hiddenClassName: string = 'modal--hidden';

  private readonly _positioner: Positioner = inject(Positioner);

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  override init(): void {
    this.setPosition(this.isCentered);
    super.init();
  }

  setPosition(isCentered: boolean): void {
    if (this.element === undefined) {
      console.error('[PositionModal] - element not found, could not position');
      return;
    }

    const modalContent: HTMLDivElement = this.element.nativeElement
      .firstChild as HTMLDivElement;
    this._positioner.centerElementOnXAxis(modalContent);

    if (!isCentered) {
      modalContent.style.marginTop = '2rem';
    } else {
      this._positioner.centerElementOnYAxis(modalContent);
    }
  }

  onValidation(): void {
    this.hide();
  }
}

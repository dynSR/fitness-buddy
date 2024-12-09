import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { IModal } from '../../../../interfaces/modal';
import { AbstractModal } from '../abstract-modal';
import { Router } from '@angular/router';
import { InputSystem } from '../../../../utils/input-system';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.css',
})
export class BaseModalComponent extends AbstractModal implements IModal {
  @Input({ required: true }) override title: string = '';
  @Input({ required: true }) override description: string = '';
  @Input({ required: true }) override btnTitle: string = '';
  @Input({ required: false }) override isCentered: boolean = true;

  @Input({ required: false }) override cancelMessage: string = '';
  @Input({ required: false }) override validationMessage: string = '';
  @ViewChild('cancelBtn')
  override cancelBtn?: ElementRef<HTMLButtonElement> = undefined;
  @ViewChild('validationBtn')
  override validationBtn?: ElementRef<HTMLButtonElement> = undefined;

  @ViewChild('modal') override element?: ElementRef<HTMLDivElement> = undefined;
  override displayedClassName: string = 'modal--displayed';
  override hiddenClassName: string = 'modal--hidden';

  protected readonly router = inject(Router);

  constructor() {
    super();
  }

  override init(): void {
    super.init();

    InputSystem.handleKeyDown('Escape', () => {
      if (this.isDisplayed) this.reset();
    });
  }

  onValidation(action?: () => void): void {
    action?.();
    this.hide();
  }

  reset(): void {
    this.hide();
  }
}

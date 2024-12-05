import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TimerState } from '../timer';
import { AbstractTimer } from '../abstract-timer';
import { IconComponent } from '../../../icon/icon.component';
import { CircularProgressBarComponent } from '../../../progress-bar/circular-progress-bar/circular-progress-bar.component';
import { Precondition } from '../../../../utils/precondition';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [IconComponent, CircularProgressBarComponent],
  templateUrl: '../timer.component.html',
  styleUrls: ['../../../../css/widget.css', '../../timer/timer.component.css'],
})
export class CountdownComponent extends AbstractTimer {
  @Input({ required: true })
  override isInteractable: boolean = true;
  @ViewChild('timerStateIcon')
  override timerStateIcon?: IconComponent = undefined;
  @ViewChild(CircularProgressBarComponent)
  override progressBar?: CircularProgressBarComponent = undefined;
  @ViewChild('stateBtn')
  override stateButtonRef?: ElementRef<HTMLButtonElement> = undefined;
  @ViewChild('refreshBtn')
  override refreshButtonRef?: ElementRef<HTMLButtonElement> = undefined;

  override canBeRefreshed: boolean = false;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy() {
    this.clear();
  }

  override init(): void {
    super.init();

    this.refreshButtonRef?.nativeElement.addEventListener('click', () =>
      this.clear()
    );

    if (this.maxDuration === 0) {
      this.setButtonState(this.stateButtonRef, true);
    }
  }

  override setMaxDuration(
    value: number,
    setCurrentToMax: boolean,
    onMaxDurationSet?: () => void
  ): void {
    super.setMaxDuration(value, setCurrentToMax, onMaxDurationSet);
    Precondition.notNull(this.progressBar, 'progressBar is null or undefined.');
    this.progressBar.set(this.currentValue, this.maxDuration);
  }

  override updateTimer(elapsedTime: number = 0): void {
    if (this.state !== TimerState.RUNNING) {
      return;
    }

    // By default add 1 second
    this.currentValue -= elapsedTime === 0 ? 1 : elapsedTime;
    this.normalizedValue = this.currentValue / 1000;
    this.progressBar?.update(this.currentValue);

    if (this.normalizedValue <= 0) {
      this.currentValue = 0;
      this.clear();
      this.onEnd.next();
      // TODO: Add a sound effect
    }
  }

  override refreshTimer(): void {
    if (!this.isInteractable || !this.canBeRefreshed) return;

    super.refreshTimer();
    this.setButtonState(this.stateButtonRef, true);
  }

  clear() {
    this.pauseTimer(TimerState.IDLE);
    this.setButtonState(this.stateButtonRef, true);
    this.setButtonState(this.refreshButtonRef, true);
    this.disable();
  }
}

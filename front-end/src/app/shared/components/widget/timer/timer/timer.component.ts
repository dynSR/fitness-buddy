import { Component, ElementRef, ViewChild } from '@angular/core';
import { TimerState } from '../timer';
import { IconComponent } from '../../../icon/icon.component';
import { AbstractTimer } from '../abstract-timer';
import { CircularProgressBarComponent } from '../../../progress-bar/circular-progress-bar/circular-progress-bar.component';
import { Precondition } from '../../../../utils/precondition';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [IconComponent, CircularProgressBarComponent],
  templateUrl: '../timer.component.html',
  styleUrls: ['../../../../css/widget.css', '../timer.component.css'],
})
export class TimerComponent extends AbstractTimer {
  @ViewChild('timerStateIcon')
  override timerStateIcon?: IconComponent = undefined;
  @ViewChild('stateBtn')
  override stateButtonRef?: ElementRef<HTMLButtonElement> = undefined;
  @ViewChild('refreshBtn')
  override refreshButtonRef?: ElementRef<HTMLButtonElement> = undefined;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy() {
    this.clear();
  }

  override init(): void {
    super.init();

    this.refreshButtonRef?.nativeElement.addEventListener('click', () =>
      this.refreshTimer()
    );
  }

  updateTimer(elapsedTime: number = 0): void {
    if (this.state !== TimerState.RUNNING) {
      return;
    }

    // By default add 1 second
    this.currentValue += elapsedTime === 0 ? 1 : elapsedTime;
    this.normalizedValue = this.currentValue / 1000;
    this.progressBar?.update(this.currentValue);

    if (this.maxDuration > 0 && this.normalizedValue === this.maxDuration) {
      this.currentValue = this.maxDuration;
      this.clear();
      this.onEnd.next();
      // TODO: Add a sound effect
    }
  }

  clear(): void {
    this.pauseTimer(TimerState.IDLE);
  }
}

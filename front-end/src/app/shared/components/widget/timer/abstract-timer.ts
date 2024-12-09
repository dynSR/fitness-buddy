import { ElementRef, inject } from '@angular/core';
import { ITimer, ITimerUIElements, TimerState } from './timer';
import { TimeFormatter } from '../../../helpers/time-formatter';
import { IInitializable } from '../../../interfaces/initializable';
import { Icon } from '../../icon/icon.interface';
import { Subject } from 'rxjs';
import { InputSystem } from '../../../utils/input-system';
import { IProgressBar } from '../../../interfaces/progress-bar';
import { IconComponent } from '../../icon/icon.component';
import { Precondition } from '../../../utils/precondition';
import { IInteractable } from '../../../interfaces/interactable';

export abstract class AbstractTimer
  implements IInitializable, IInteractable, ITimer, ITimerUIElements
{
  isInteractable: boolean = true;
  canBeRefreshed: boolean = true;

  state: TimerState = TimerState.IDLE;
  onStateChange: Subject<TimerState> = new Subject<TimerState>();
  onEnd: Subject<void> = new Subject<void>();

  // UI Elements
  timerStateIcon?: IconComponent = undefined;
  progressBar?: IProgressBar = undefined;
  stateButtonRef?: ElementRef<HTMLButtonElement> = undefined;
  refreshButtonRef?: ElementRef<HTMLButtonElement> = undefined;

  timerPlayIcon: string = '/assets/icons/timer/play.svg';
  timerPauseIcon: string = '/assets/icons/timer/pause.svg';
  timerRefreshIcon: string = '/assets/icons/timer/refresh.svg';

  private _maxDuration: number = 0;
  get maxDuration() {
    return this._maxDuration;
  }
  set maxDuration(value: number) {
    if (value < 0) {
      this._maxDuration = 0;
      console.error(
        "Timer's max duration cannot be negative (it will be set to 0)."
      );
    } else {
      this._maxDuration = value;
    }
  }

  initialValue: number = 0;
  currentValue: number = 0;
  normalizedValue: number = 0;
  interval?: ReturnType<typeof setInterval> = undefined;

  protected timeFormatter = inject(TimeFormatter);

  protected constructor() {}

  init(): void {
    this.currentValue = this.initialValue;
    InputSystem.handleKeyDown('Escape', () => this.refreshTimer());
    InputSystem.handleKeyDown('Space', () => this.toggleTimer());
    this.setButtonState(this.refreshButtonRef, true);
  }

  /**
   * Gets the current value of the timer in milliseconds, or a formatted string
   * representing the current value in MM:SS:MMM format.
   *
   * @param {boolean} isFormatted - If true, returns a formatted string.
   *                                 If false, returns the current value in milliseconds.
   * @returns {(string | number)} A string in MM:SS:MMM format if isFormatted is true, or
   *                              the current value in milliseconds if isFormatted is false.
   */
  getCurrentValue(isFormatted: boolean): string | number {
    if (isFormatted) {
      return this.timeFormatter.formatToSecondsMinutesMilliseconds(
        this.currentValue
      );
    }
    return this.currentValue;
  }

  /**
   * Sets the maximum duration of the timer in milliseconds and sets the current
   * value to the maximum duration.
   *
   * @param {number} value - The maximum duration of the timer in milliseconds.
   */
  setMaxDuration(
    value: number,
    setCurrentToMax: boolean,
    onMaxDurationSet?: () => void
  ): void {
    this.maxDuration = value;

    if (setCurrentToMax) {
      this.currentValue = this.maxDuration;
      this.setButtonState(this.stateButtonRef, false);
    }

    onMaxDurationSet?.();
  }

  startTimer(): void {
    if (!this.isInteractable) return;

    console.log('Start timer');
    this.state = TimerState.RUNNING;
    this.setStateIcon(this.timerStateIcon as Icon, TimerState.RUNNING);
    this.onStateChange.next(TimerState.RUNNING);
    this.setButtonState(this.refreshButtonRef, false);

    // ms is used to adjust the speed of the timer
    const ms = 10;
    this.interval ??= setInterval(() => {
      console.log(this.state);
      this.updateTimer(ms);
    }, ms);
  }
  pauseTimer(state?: TimerState): void {
    if (!this.isInteractable) return;

    this.state = state ?? TimerState.PAUSED;
    this.setStateIcon(this.timerStateIcon as Icon, TimerState.PAUSED);
    this.onStateChange.next(this.state);

    window.clearInterval(this.interval);
    this.interval = undefined;
  }
  toggleTimer(): void {
    if (!this.isInteractable) return;

    if (this.state === TimerState.RUNNING) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  abstract updateTimer(elapsedTime: number): void;
  refreshTimer(): void {
    if (!this.isInteractable || !this.canBeRefreshed) return;

    this.pauseTimer(TimerState.IDLE);
    this.currentValue = this.initialValue;
    this.setButtonState(this.refreshButtonRef, true);
  }

  abstract clear(): void;

  enable(): void {
    this.isInteractable = true;
  }
  disable(): void {
    this.isInteractable = false;
  }

  // UI methods below
  setStateIcon(icon: Icon, state: TimerState) {
    let title = '';
    let imgSource = '';
    let imgAlt = '';

    const iconParentFolder = './assets/icons/timer/';
    if (state !== TimerState.RUNNING) {
      imgSource = iconParentFolder + 'play.svg';
      imgAlt = 'Timer start icon';
      title = 'timer.start';
    } else {
      imgSource = iconParentFolder + 'pause.svg';
      imgAlt = 'Timer pause icon';
      title = 'timer.pause';
    }

    icon.setIcon(imgSource);
    icon.setAlt(imgAlt);
    icon.setTitle(title);
  }

  setButtonState(
    button: ElementRef<HTMLButtonElement> | undefined,
    isDisabled: boolean
  ) {
    if (button === undefined) return;
    button.nativeElement.disabled = isDisabled;

    console.log(
      `Button (${button.nativeElement.id}) state set to ${
        isDisabled ? 'disabled' : 'enabled'
      }.`
    );
  }
}

import { Subject } from 'rxjs';
import { IconComponent } from '../../icon/icon.component';
import { ElementRef } from '@angular/core';
import { Icon } from '../../icon/icon.interface';
import { IProgressBar } from '../../../interfaces/progress-bar';

export enum TimerState {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
}

export interface ITimer {
  state: TimerState;

  maxDuration: number;
  initialValue: number;
  currentValue: number;
  normalizedValue: number;

  canBeRefreshed: boolean;

  interval?: ReturnType<typeof setInterval>;
  onStateChange: Subject<TimerState>;
  onEnd: Subject<void>;

  getCurrentValue(isFormatted: boolean): string | number;
  setMaxDuration(
    value: number,
    setCurrentToMax: boolean,
    onMaxDurationSet?: () => void
  ): void;

  startTimer(): void;
  pauseTimer(): void;
  toggleTimer(): void;

  updateTimer(elapsedTime: number): void;
  refreshTimer(): void;
  clear(): void;
}

export interface ITimerUIElements {
  timerStateIcon?: IconComponent;
  progressBar?: IProgressBar;
  stateButtonRef?: ElementRef<HTMLButtonElement>;
  refreshButtonRef?: ElementRef<HTMLButtonElement>;

  timerPlayIcon: string;
  timerPauseIcon: string;
  timerRefreshIcon: string;

  setStateIcon(icon: Icon, state: TimerState): void;
  setButtonState(
    button: ElementRef<HTMLButtonElement> | undefined,
    isDisabled: boolean
  ): void;
}

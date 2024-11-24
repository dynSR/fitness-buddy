export enum TimerState {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
}

export interface Timer {
  state: TimerState;

  maxDuration: number;
  initialValue: number;
  currentValue: number;
  normalizedValue: number;

  interval?: ReturnType<typeof setInterval>;

  startTimer(): void;
  updateTimer(elapsedTime: number): void;
  pauseTimer(): void;
  refreshTimer(): void;
}

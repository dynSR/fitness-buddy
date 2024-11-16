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

  start(): void;
  update(elapsedTime: number): void;
  pause(): void;
  refresh(): void;
}

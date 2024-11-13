import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { TimeFormatter } from '../../utils/time-formatter';

enum TimerState {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  STOP = 'STOP',
}

interface Timer {
  state: TimerState;

  maxDuration: number;
  initialValue: number;
  currentValue: number;

  interval?: ReturnType<typeof setInterval>;
}

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css', '../../../css/widget.css'],
})
export class TimerComponent implements Timer {
  @Input({ required: true }) maxDuration = 0;

  @ViewChild('timerStateBtn') timerStateBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('timerStopBtn') timerStopBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('timerProgress') timerProgress!: ElementRef<HTMLDivElement>;

  state: TimerState = TimerState.STOP;
  initialValue = 0;
  currentValue = 0;

  interval?: ReturnType<typeof setInterval> = undefined;

  readonly timeFormatter = inject(TimeFormatter);

  constructor() {}

  ngOnInit() {
    this.currentValue = this.initialValue;
  }

  private updateTimer(): void {
    if (this.state !== TimerState.PLAY) {
      return;
    }

    this.currentValue++;
    this.updateTimerProgressBar();

    if (this.maxDuration > 0 && this.currentValue === this.maxDuration) {
      this.pauseTimer();
    }
  }

  private startTimer(): void {
    console.log('Start timer');
    this.state = TimerState.PLAY;
    this.setStateBtnIcon();
    this.setDisabledBtnState(this.timerStopBtn, false);

    this.interval ??= setInterval(() => {
      console.log(this.state);
      this.updateTimer();
    }, 1000);
  }
  private pauseTimer(): void {
    this.state = TimerState.PAUSE;
    this.setStateBtnIcon();

    window.clearInterval(this.interval);
    this.interval = undefined;
  }
  public toggleTimer(): void {
    switch (this.state) {
      case TimerState.PLAY:
        this.pauseTimer();
        break;
      case TimerState.PAUSE:
        this.startTimer();
        break;
      case TimerState.STOP:
        this.startTimer();
        break;
    }
  }

  public stopTimer(): void {
    this.state = TimerState.STOP;
    this.setStateBtnIcon();

    this.currentValue = this.initialValue;
    this.updateTimerProgressBar();
    this.setDisabledBtnState(this.timerStopBtn, true);

    window.clearInterval(this.interval);
    this.interval = undefined;
  }

  private setDisabledBtnState(
    elementRef: ElementRef<HTMLButtonElement>,
    flag: boolean
  ) {
    const btn = elementRef.nativeElement;
    btn.disabled = flag;
  }

  private setStateBtnIcon() {
    const btn: HTMLButtonElement = this.timerStateBtn.nativeElement;
    const imgContainer: Element = btn.children[0];
    const img: HTMLImageElement = imgContainer.children[0] as HTMLImageElement;

    let title = '';
    let imgSource = '';
    let imgAlt = '';

    switch (this.state) {
      case TimerState.PLAY:
        title = 'timer.pause';
        imgSource = './assets/timer/pause.svg';
        imgAlt = 'Timer pause icon';
        break;
      case TimerState.PAUSE:
        title = 'timer.start';
        imgSource = './assets/timer/play.svg';
        imgAlt = 'Timer start icon';
        break;
      case TimerState.STOP:
        title = 'timer.start';
        imgSource = './assets/timer/play.svg';
        imgAlt = 'Timer start icon';
        break;
    }

    console.log('Image', img);

    img.src = imgSource;
    img.alt = imgAlt;
    btn.title = title;
  }

  private updateTimerProgressBar() {
    const progressBar = this.timerProgress.nativeElement;
    const progress = (this.currentValue / this.maxDuration) * 360;
    progressBar.style.background = `conic-gradient(var(--color-primary) ${progress}deg, #fff 0deg)`;
    console.log('Update Progress bar');
  }
}

import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { TimeFormatter } from '../../utils/time-formatter';
import { Timer, TimerState } from './timer';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css', '../../css/widget.css'],
})
export class TimerComponent implements Timer {
  private _maxDuration = 0;
  @Input({ required: true })
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

  @ViewChild('timerStateBtn') timerStateBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('timerRefreshBtn')
  timerRefreshBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('timerProgress') timerProgress!: ElementRef<HTMLDivElement>;
  @ViewChild('timerValue') timerValue!: ElementRef<HTMLParagraphElement>;

  state: TimerState = TimerState.IDLE;
  initialValue = 0;
  currentValue = 0;
  normalizedValue = 0;

  interval?: ReturnType<typeof setInterval> = undefined;

  readonly timeFormatter = inject(TimeFormatter);
  readonly timerPlayIconSrc = './assets/icons/timer/play.svg';
  readonly timerRefreshIconSrc = './assets/icons/timer/refresh.svg';

  constructor() {}

  ngOnInit() {
    this.currentValue = this.initialValue;
  }

  ngAfterViewInit() {
    this.setCircularProgressUIClass();
  }

  ngOnChanges() {}

  start(): void {
    // console.log('Start timer');
    this.state = TimerState.RUNNING;
    this.setStateBtnIcon();
    this.setDisabledBtnState(this.timerRefreshBtn, false);

    // ms is used to adjust the speed of the timer
    const ms = 10;
    this.interval ??= setInterval(() => {
      // console.log(this.state);
      this.update(ms);
    }, ms);
  }

  update(elapsedTime: number = 0): void {
    if (this.state !== TimerState.RUNNING) {
      return;
    }

    this.currentValue += elapsedTime === 0 ? 1 : elapsedTime;
    this.normalizedValue = this.currentValue / 1000;
    this.updateTimerProgressBar(this.normalizedValue, this.maxDuration);

    if (this.maxDuration > 0 && this.normalizedValue === this.maxDuration) {
      this.pause();
      // TODO: Add a sound effect
    }
  }

  pause(): void {
    this.state = TimerState.PAUSED;
    this.setStateBtnIcon();

    window.clearInterval(this.interval);
    this.interval = undefined;
  }

  refresh(): void {
    this.state = TimerState.IDLE;
    this.setStateBtnIcon();

    this.currentValue = this.initialValue;
    this.updateTimerProgressBar(this.currentValue, this.maxDuration);
    this.setDisabledBtnState(this.timerRefreshBtn, true);

    window.clearInterval(this.interval);
    this.interval = undefined;
  }

  toggleTimer(): void {
    switch (this.state) {
      case TimerState.RUNNING:
        this.pause();
        break;
      case TimerState.PAUSED:
        this.start();
        break;
      case TimerState.IDLE:
        this.start();
        break;
    }
  }

  private setCircularProgressUIClass() {
    const className =
      this.maxDuration > 0
        ? 'circular-progress--displayed'
        : 'circular-progress--hidden';
    this.timerProgress.nativeElement.classList.add(className);
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

    const parentFolder = './assets/icons/timer/';

    switch (this.state) {
      case TimerState.RUNNING:
        title = 'timer.pause';
        imgSource = parentFolder + 'pause.svg';
        imgAlt = 'Timer pause icon';
        break;
      case TimerState.PAUSED:
        title = 'timer.start';
        imgSource = parentFolder + 'play.svg';
        imgAlt = 'Timer start icon';
        break;
      case TimerState.IDLE:
        title = 'timer.start';
        imgSource = parentFolder + 'play.svg';
        imgAlt = 'Timer start icon';
        break;
    }

    // console.log('Image', img);

    img.src = imgSource;
    img.alt = imgAlt;
    btn.title = title;
  }

  private updateTimerProgressBar(
    current: number,
    max: number,
    deg: number = 360
  ): void {
    if (max === 0) {
      return;
    }

    const progressBar = this.timerProgress.nativeElement;
    let progress = 0;

    progress = (current / max) * deg;
    progressBar.style.background = `conic-gradient(var(--color-primary) ${progress}deg, #fff 0deg)`;
  }
}

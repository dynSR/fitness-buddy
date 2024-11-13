import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  // class Timer {
  //   #STATE_PLAY = "PLAY";
  //   #STATE_PAUSE = "PAUSE";
  //   #STATE_STOP = "STOP";
  //   #currentState = "";
  //   #initialValue = 0;
  //   #currentValue = 0;
  //   #maxValue = 0;
  //   constructor(maxValue = 0) {
  //     this.value = document.querySelector(".widget__timer-value");
  //     this.timerProgress = document.getElementById("timerProgress");
  //     this.setTimerValue(this.#initialValue);
  //     this.#currentState = this.#STATE_STOP;
  //     this.#maxValue = maxValue;
  //     this.timerStateBtn = document.getElementById("timerStateBtn");
  //     this.timerStateBtn.addEventListener("click", () => {
  //       if (this.#currentState === this.#STATE_PLAY) {
  //         this.pauseTimer();
  //         return;
  //       }
  //       this.startTimer();
  //     });
  //     this.timerStopBtn = document.getElementById("timerStopBtn");
  //     this.disableStopBtn();
  //     this.timerStopBtn.addEventListener("click", () => {
  //       this.stopTimer();
  //     });
  //   }
  //   set() {
  //     setInterval(() => {
  //       console.log(this.#currentState);
  //       if (this.#currentState !== this.#STATE_PLAY) {
  //         return;
  //       }
  //       this.#currentValue++;
  //       this.setTimerValue(this.#currentValue);
  //       this.updateTimerProgress();
  //       if (this.#maxValue > 0 && this.#currentValue === this.#maxValue) {
  //         this.pauseTimer();
  //       }
  //     }, 1000);
  //   }
  //   startTimer() {
  //     this.#currentState = this.#STATE_PLAY;
  //     this.setStateBtnIcon();
  //     this.enableStopBtn();
  //   }
  //   pauseTimer() {
  //     this.#currentState = this.#STATE_PAUSE;
  //     this.setStateBtnIcon();
  //   }
  //   stopTimer() {
  //     this.#currentState = this.#STATE_STOP;
  //     this.setStateBtnIcon();
  //     this.setTimerValue(this.#initialValue);
  //     this.disableStopBtn();
  //     this.updateTimerProgress();
  //   }
  //   setTimerValue(value) {
  //     this.#currentValue = value;
  //     this.value.textContent = this.formatTime(this.#currentValue);
  //   }
  //   enableStopBtn() {
  //     this.timerStopBtn.disabled = false;
  //   }
  //   disableStopBtn() {
  //     this.timerStopBtn.disabled = true;
  //   }
  //   formatTime(time) {
  //     const minutes = Math.floor(time / 60);
  //     const seconds = time % 60;
  //     // Format the time and add a leading zero to have two digits (00:00)
  //     const formattedMinutes = minutes.toString().padStart(2, "0");
  //     const formattedSeconds = seconds.toString().padStart(2, "0");
  //     return `${formattedMinutes}:${formattedSeconds}`;
  //   }
  //   setStateBtnIcon() {
  //     const imgContainer = this.timerStateBtn.children[0];
  //     const img = imgContainer.children[0];
  //     let title = "";
  //     let imgSource = "";
  //     let imgAlt = "";
  //     switch (this.#currentState) {
  //       case this.#STATE_PLAY:
  //         title = "timer.pause";
  //         imgSource = "./assets/images/timer/pause.svg";
  //         imgAlt = "Timer pause icon";
  //         break;
  //       case this.#STATE_PAUSE:
  //         title = "timer.start";
  //         imgSource = "./assets/images/timer/play.svg";
  //         imgAlt = "Timer start icon";
  //         break;
  //       case this.#STATE_STOP:
  //         title = "timer.start";
  //         imgSource = "./assets/images/timer/play.svg";
  //         imgAlt = "Timer start icon";
  //         break;
  //     }
  //     img.src = imgSource;
  //     img.alt = imgAlt;
  //     this.timerStateBtn.title = title;
  //   }
  //   updateTimerProgress() {
  //     const progress = (this.#currentValue / this.#maxValue) * 360;
  //     this.timerProgress.style.background = `conic-gradient(var(--color-primary) ${progress}deg, #fff 0deg)`;
  //     console.log(progress);
  //   }
  // }
  // document.addEventListener("DOMContentLoaded", () => {
  //   const timer = new Timer(10);
  //   timer.set();
  // });
}

import { Component } from '@angular/core';
import { TimerComponent } from '../../../shared/components/widget/timer/timer.component';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from '../../exercise/list/exercise-list.component';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule, TimerComponent, ExerciseListComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
})
export class SessionComponent {}

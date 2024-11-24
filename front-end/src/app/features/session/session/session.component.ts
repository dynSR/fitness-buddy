import { Component } from '@angular/core';
import { TimerComponent } from '../../../shared/components/widget/timer/timer.component';
import { CommonModule } from '@angular/common';
import { ExerciseGroupComponent } from '../../exercise/exercise-group/exercise-group.component';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule, TimerComponent, ExerciseGroupComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
})
export class SessionComponent {}

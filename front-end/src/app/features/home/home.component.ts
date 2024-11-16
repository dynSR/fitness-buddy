import { Component } from '@angular/core';
import { WeatherComponent } from '../../shared/widgets/weather/weather.component';
import { TimerComponent } from '../../shared/widgets/timer/timer.component';
import { ExerciseListComponent } from '../exercise/exercise-list/exercise-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    WeatherComponent,
    TimerComponent,
    ExerciseListComponent,
    ExerciseListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

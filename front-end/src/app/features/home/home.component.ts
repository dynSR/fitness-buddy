import { Component } from '@angular/core';
import { ExerciseListComponent } from '../exercise/exercise-list/exercise-list.component';
import { WeatherComponent } from '../../shared/components/widgets/weather/weather.component';
import { TimerComponent } from '../../shared/components/widgets/timer/timer.component';

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

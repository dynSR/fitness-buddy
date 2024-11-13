import { Component } from '@angular/core';
import { WeatherComponent } from '../widgets/weather/weather.component';
import { TimerComponent } from '../widgets/timer/timer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WeatherComponent, TimerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { WeatherComponent } from '../../shared/components/widget/weather/weather.component';
import { StepsTrackerComponent } from '../../shared/components/widget/steps-tracker/steps-tracker.component';
import { LastSportSessionComponent } from '../../shared/components/widget/last-sport-session/last-sport-session.component';
import { FilterGroupComponent } from '../../shared/components/filter/filter-group/filter-group.component';
import { NewSessionModalComponent } from '../session/new-session-modal/new-session-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    WeatherComponent,
    StepsTrackerComponent,
    LastSportSessionComponent,
    FilterGroupComponent,
    NewSessionModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

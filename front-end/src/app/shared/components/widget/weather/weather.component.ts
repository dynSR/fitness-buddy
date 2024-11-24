import { Component } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { NumberToArrayPipe } from '../../../pipes/number-to-array/number-to-array.pipe';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [IconComponent, NumberToArrayPipe],
  templateUrl: './weather.component.html',
  styleUrls: ['../../../css/widget.css', './weather.component.css'],
})
export class WeatherComponent {}

import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { NumberToArrayPipe } from '../../../shared/pipes/number-to-array/number-to-array.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-series-counter',
  standalone: true,
  imports: [CommonModule, IconComponent, NumberToArrayPipe],
  templateUrl: './exercise-series-counter.component.html',
  styleUrl: './exercise-series-counter.component.css',
})
export class ExerciseSeriesCounterComponent {
  @Input({ required: true }) series!: number;
  @ViewChildren(IconComponent) icons!: QueryList<IconComponent>;
}

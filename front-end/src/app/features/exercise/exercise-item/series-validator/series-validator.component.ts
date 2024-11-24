import { Component, Input, QueryList, ViewChildren } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { NumberToArrayPipe } from '../../../../shared/pipes/number-to-array/number-to-array.pipe';

@Component({
  selector: 'app-exercise-series-counter',
  standalone: true,
  imports: [CommonModule, IconComponent, NumberToArrayPipe],
  templateUrl: './series-validator.component.html',
})
export class ExerciseSeriesCounterComponent {
  @Input({ required: true }) series!: number;
  @ViewChildren(IconComponent) icons!: QueryList<IconComponent>;
}

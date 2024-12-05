import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { NumberToArrayPipe } from '../../../shared/pipes/number-to-array/number-to-array.pipe';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { Icon } from '../../../shared/components/icon/icon.interface';
import { IInitializable } from '../../../shared/interfaces/initializable';

@Component({
  selector: 'app-series-validator',
  standalone: true,
  imports: [NumberToArrayPipe, IconComponent],
  templateUrl: './series-validator.component.html',
  styleUrl: './series-validator.component.css',
})
export class SeriesValidatorComponent implements IInitializable {
  @Input({ required: true })
  amount: number = 0;
  @ViewChildren(IconComponent)
  icons: QueryList<IconComponent> = new QueryList();

  private readonly _series: { icon: Icon; hasBeenValidated: boolean }[] = [];

  idleSeriesIcon: string = 'assets/icons/circle.png';
  validSeriesIcon: string = 'assets/icons/circle-full.png';

  constructor() {}

  ngAfterViewInit(): void {
    this.init();
  }

  init(): void {
    this.icons.forEach((i) => {
      this._series.push({
        icon: i,
        hasBeenValidated: false,
      });
    });

    console.log(this._series);
  }

  validateOneSeries() {
    this._series.forEach((s) => {
      if (!s.hasBeenValidated) {
        s.hasBeenValidated = true;
        s.icon.setIcon(this.validSeriesIcon);
      }
    });
  }
}

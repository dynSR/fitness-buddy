import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { NumberToArrayPipe } from '../../../shared/pipes/number-to-array/number-to-array.pipe';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { Icon } from '../../../shared/components/icon/icon.interface';
import { IInitializable } from '../../../shared/interfaces/initializable';
import { Subscription } from 'rxjs';
import { ExtendedArray } from '../../../shared/extensions/extended-array';

@Component({
  selector: 'app-series-validator',
  standalone: true,
  imports: [NumberToArrayPipe, IconComponent],
  templateUrl: './series-validator.component.html',
  styleUrl: './series-validator.component.css',
})
export class SeriesValidatorComponent implements IInitializable {
  @Input({ required: false }) amount: number = 0;
  @ViewChildren(IconComponent)
  icons: QueryList<IconComponent> = new QueryList();

  private _iconsChangesSubscription = new Subscription();
  private readonly _series = new ExtendedArray<{
    icon: Icon;
    hasBeenValidated: boolean;
  }>();

  idleSeriesIcon: string = 'assets/icons/circle.png';
  validSeriesIcon: string = 'assets/icons/circle-full.png';

  constructor() {}

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this._iconsChangesSubscription.unsubscribe();
  }

  init(): void {
    // console.log('[init] - Amount : ', amount);
    if (this.amount > 0) return;

    this._iconsChangesSubscription = this.icons.changes.subscribe(
      (queryList: QueryList<IconComponent>) => {
        queryList.forEach((icon) => {
          this._series.push({
            icon: icon,
            hasBeenValidated: false,
          });
        });

        // console.log('[init] - Series : ', this._series);
      }
    );
  }

  validateOneSeries() {
    if (this.areAllSeriesValidated()) return; // No need to validate if all series are valid

    console.log('[validateOneSeries] - Validating one series');

    const firstUnvalidatedSeries = this._series.find(
      (s) => !s.hasBeenValidated
    );
    if (firstUnvalidatedSeries) {
      firstUnvalidatedSeries.hasBeenValidated = true;
      firstUnvalidatedSeries.icon.setIcon(this.validSeriesIcon);
    }
  }

  areAllSeriesValidated(): boolean {
    return this._series.every((s) => s.hasBeenValidated);
  }

  clear() {
    this._series.forEach((s) => {
      s.hasBeenValidated = false;
      s.icon.setIcon(this.idleSeriesIcon);
    });

    console.log('[clear] - Series cleared', this._series);
  }
}

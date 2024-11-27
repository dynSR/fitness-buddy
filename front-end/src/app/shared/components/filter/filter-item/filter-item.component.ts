import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseSelectable } from '../../../interfaces/selectable/base-selectable';
import { ISelectable } from '../../../interfaces/selectable/selectable';

export interface IFilter<T extends string | number | Date> {
  value: T;
  isApplied: boolean;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  template: `
    <div #selectable class="selectable--idle user-select-none">
      <p>{{ value }}</p>
    </div>
  `,
  styleUrls: [
    '../../../../shared/interfaces/selectable/selectable.css',
    './filter-item.component.css',
  ],
})
export class FilterItemComponent
  extends BaseSelectable
  implements IFilter<string>
{
  @Input({ required: true }) value!: string;
  isApplied: boolean = false;

  @ViewChild('selectable') override element?: ElementRef<HTMLDivElement> =
    undefined;
  @Output() override onSelectableClicked: EventEmitter<ISelectable> =
    new EventEmitter<ISelectable>();

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  override select(index: number): void {
    super.select(index);
    this.isApplied = true;
  }

  override unselect(): void {
    super.unselect();
    this.isApplied = false;
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ISelectable, Selectable } from '../../selectable/selectable';

export interface IFilter<T extends string | number | Date> {
  value: T;
  isApplied: boolean;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter-item.component.html',
  styleUrls: [
    '../../../../shared/components/selectable/selectable.css',
    './filter-item.component.css',
  ],
})
export class FilterItemComponent extends Selectable implements IFilter<string> {
  @Input({ required: true }) value!: string;
  isApplied: boolean = false;

  @ViewChild('selectable') declare element: ElementRef;
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

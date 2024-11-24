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

  override isSelectable: boolean = true;
  @ViewChild('selectable') declare element: ElementRef;
  @Output() override onSelectableClickEmitter: EventEmitter<ISelectable> =
    new EventEmitter<ISelectable>();

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  override toggle(): void {
    super.toggle();
    this.isApplied = !this.isApplied;
  }
}

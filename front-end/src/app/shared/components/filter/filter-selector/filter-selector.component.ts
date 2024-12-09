import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseSelectable } from '../../selectable/base-selectable';
import { ISelectable } from '../../../interfaces/selectable/selectable';

@Component({
  selector: 'app-filter-selector',
  standalone: true,
  imports: [],
  template: `
    <section #selectable class="filter-selector">
      <p>{{ filter }}</p>
    </section>
  `,
  styleUrls: [
    '../../selectable/base-selectable.css',
    './filter-selector.component.css',
  ],
})
export class FilterSelectorComponent extends BaseSelectable {
  @Input({ required: true }) filter: string = '';

  @ViewChild('selectable')
  override elementRef?: ElementRef<HTMLDivElement> | undefined = undefined;
  @Output() override onSelectableClicked: EventEmitter<ISelectable> =
    new EventEmitter();

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
  }
}

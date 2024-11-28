import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FilterItemComponent } from '../filter-item/filter-item.component';
import { BaseSelectableGroup } from '../../selectable/base-selectable-group';
import { ISelectable } from '../../../interfaces/selectable/selectable';
import { SelectableGroupCheckboxComponent } from '../../selectable/selectable-group-checkbox/selectable-group-checkbox.component';

@Component({
  selector: 'app-filter-group',
  standalone: true,
  imports: [FilterItemComponent, SelectableGroupCheckboxComponent],
  template: `
    <div class="filter-group">
      @for (filter of filters; track $index) {
      <app-filter
        [value]="filter"
        (onSelectableClicked)="handleSelectableClicked($event)"
      />
      } @if(isInteractable && canSelectMultiple) {
      <app-selectable-group-checkbox
        [parent]="this"
        (onCheckboxClicked)="handleSelectionCheckboxClicked()"
      />
      }
    </div>
  `,
  styleUrl: './filter-group.component.css',
})
export class FilterGroupComponent extends BaseSelectableGroup {
  @ViewChildren(FilterItemComponent)
  override selectables: QueryList<FilterItemComponent> = new QueryList();
  override isInteractable: boolean = true;
  override canSelectMultiple: boolean = true;

  @Input({ required: true }) filters!: Array<string>;
  @Output() onFilterSelection: EventEmitter<Array<FilterItemComponent>> =
    new EventEmitter<Array<FilterItemComponent>>();

  constructor() {
    super();
  }

  override handleSelectableClicked(eventData: ISelectable): void {
    super.handleSelectableClicked(eventData);
    this.onFilterSelection.emit(this.selectables.toArray());
  }
}

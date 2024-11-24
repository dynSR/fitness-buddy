import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SelectableGroup } from '../../selectable/selectable-group';
import { FilterItemComponent } from '../filter-item/filter-item.component';
import { ISelectable } from '../../selectable/selectable';

@Component({
  selector: 'app-filter-group',
  standalone: true,
  imports: [FilterItemComponent],
  templateUrl: './filter-group.component.html',
  styleUrl: './filter-group.component.css',
})
export class FilterGroupComponent extends SelectableGroup {
  @ViewChildren(FilterItemComponent)
  declare selectables: QueryList<FilterItemComponent>;
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

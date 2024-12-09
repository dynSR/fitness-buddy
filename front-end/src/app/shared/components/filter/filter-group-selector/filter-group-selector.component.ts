import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BaseSelectableGroup } from '../../selectable/base-selectable-group';
import { FilterSelectorComponent } from '../filter-selector/filter-selector.component';

@Component({
  selector: 'app-filter-group-selector',
  standalone: true,
  imports: [FilterSelectorComponent],
  template: `
    <section class="filter-group-selector">
      @for (filter of filters; track $index) {
      <app-filter-selector
        [filter]="filter"
        (onSelectableClicked)="handleSelectableClicked($event)"
      />
      }

      <!-- Checkbox -->
      @if (canSelectMultiple) {
      <input
        #checkbox
        type="checkbox"
        class="form-check-input"
        (click)="handleSelectionCheckboxClicked()"
      />
      }
    </section>
  `,
  styleUrl: './filter-group-selector.component.css',
})
export class FilterGroupSelectorComponent extends BaseSelectableGroup {
  @Input({ required: true }) filters: string[] = [];

  @Input({ required: false })
  override isInteractable: boolean = true;
  @Input({ required: false })
  override canSelectMultiple: boolean = true;
  @ViewChildren(FilterSelectorComponent)
  override selectables: QueryList<FilterSelectorComponent> = new QueryList();
  @ViewChild('checkbox')
  override checkbox?: ElementRef<HTMLInputElement> = undefined;

  constructor() {
    super();
  }
}

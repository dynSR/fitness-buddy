import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ISelectable } from '../../../interfaces/selectable/selectable';
import { Subscription } from 'rxjs';
import { ISelectableGroup } from '../../../interfaces/selectable/selectable-group';

@Component({
  selector: 'app-selectable-group-checkbox',
  standalone: true,
  imports: [],
  template: `
    <input
      #checkboxSelection
      type="checkbox"
      class="form-check-input"
      (click)="onCheckboxClicked.emit()"
    />
  `,
})
export class SelectableGroupCheckboxComponent {
  @Input({ required: true }) parent!: ISelectableGroup<ISelectable>;

  @ViewChild('checkboxSelection')
  selectionCheckbox!: ElementRef<HTMLInputElement>;
  @Output() onCheckboxClicked: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  groupSelectionsChangeSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.groupSelectionsChangeSubscription =
      this.parent.selectionChanged.subscribe((selectables) =>
        this.updateCheckbox(selectables)
      );
  }

  ngOnDestroy(): void {
    this.groupSelectionsChangeSubscription.unsubscribe();
  }

  updateCheckbox(selectables: Array<ISelectable>): void {
    if (selectables.length === 0) {
      return;
    }

    console.log('[updateCheckbox] - areAllItemsSelected : ', selectables);

    const areAllItemsSelected = selectables.every((s) => s.isSelected);
    console.log(
      '[updateCheckbox] - areAllItemsSelected : ',
      areAllItemsSelected
    );

    const checkbox: HTMLInputElement = this.selectionCheckbox.nativeElement;
    checkbox.checkVisibility();
    checkbox.checked = areAllItemsSelected;
  }
}

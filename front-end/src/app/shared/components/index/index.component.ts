import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IIndexable } from '../../interfaces/indexable';
import { BaseDisplayable } from '../../interfaces/displayable/base-displayable';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  template: `
    <p #index class="selectable__index--hidden numeric">
      {{ value }}
    </p>
  `,
  styleUrl: './index.component.css',
})
export class IndexComponent extends BaseDisplayable {
  @Input({ required: true }) parent!: IIndexable;
  value: number = 0;

  @ViewChild('index') override element?: ElementRef<HTMLParagraphElement> =
    undefined;
  @Input({ required: true }) override isDisplayable: boolean = true;
  @Input({ required: false }) override isDisplayed: boolean = false;

  override displayedClassName: string = 'selectable__index--displayed';
  override hiddenClassName: string = 'selectable__index--hidden';

  private _indexableSubscription: Subscription = new Subscription();

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this._indexableSubscription?.unsubscribe();
  }

  override init(): void {
    this._indexableSubscription = this.parent.onIndexValueChangeEvent.subscribe(
      (value) => this.setValue(value)
    );
    super.init();
  }

  setValue(index: number) {
    this.value = index;
    // console.log('[setValue] - Index set to', index);

    if (this.value > 0) {
      this.display();
      return;
    }

    this.hide();
  }
}

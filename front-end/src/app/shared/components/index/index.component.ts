import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IDisplayable } from '../../interfaces/displayable';
import { Subscription } from 'rxjs';
import { IIndexable } from '../../interfaces/indexable';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements IDisplayable {
  @ViewChild('index') indexElement?: ElementRef;

  @Input({ required: true }) parent!: IIndexable;
  @Input({ required: true }) isDisplayable!: boolean;
  @Input({ required: false }) isDisplayed: boolean = false;
  value: number = 0;

  displayedClassName: string = 'selectable__index--hidden';
  hiddenClassName: string = 'selectable__index--displayed';

  private _indexableSubscription: Subscription = new Subscription();

  constructor() {}

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this._indexableSubscription?.unsubscribe();
  }

  init(): void {
    // console.log('[IndexComponent] - init ' + this.parent.index);

    this._indexableSubscription = this.parent.onIndexValueChangeEvent.subscribe(
      (value) => this.setValue(value)
    );
  }

  display(): void {
    if (!this.isDisplayable || this.indexElement === undefined) {
      console.error(
        '[Display] - indexElement not found, could not change classes' +
          '\n Or the element is not displayable.'
      );
      return;
    }

    if (
      this.indexElement.nativeElement.classList.replace(
        this.displayedClassName,
        this.hiddenClassName
      )
    ) {
      this.isDisplayed = true;
      // console.log('[Display] - indexElement displayed successfully');
      return;
    }
  }

  hide(): void {
    if (this.indexElement === undefined) {
      console.error(
        '[Hide] - indexElement not found, could not change classes'
      );
      return;
    }

    if (
      this.indexElement.nativeElement.classList.replace(
        this.hiddenClassName,
        this.displayedClassName
      )
    ) {
      this.isDisplayed = false;
      // console.log('[Hide] - indexElement hidden successfully');
      return;
    }
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

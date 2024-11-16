import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { Entity } from '../../../models/entity.model';
import { SelectableContainer } from '../../selectable/selectable-container';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css',
})
export class SelectorComponent extends SelectableContainer {
  @ViewChild('container')
  declare container: ElementRef<HTMLDivElement>;
  @Input({ required: true }) elements: Array<Entity> = [];
  @Input({ required: true }) filters: Array<string> = [];

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    // console.log('After view init', {
    //   elements: this.elements,
    //   filters: this.filters,
    // });

    this.init(this.container);
  }
}

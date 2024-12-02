import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseSelectable } from '../../../shared/components/selectable/base-selectable';
import { Exercise } from '../exercise.model';
import { ISelectable } from '../../../shared/interfaces/selectable/selectable';

@Component({
  selector: 'app-exercise-selector',
  standalone: true,
  imports: [],
  templateUrl: './exercise-selector.component.html',
  styleUrls: [
    '../../../shared/components/selectable/base-selectable.css',
    '../../../shared/css/input.css',
    './exercise-selector.component.css',
  ],
})
export class ExerciseSelectorComponent extends BaseSelectable {
  @Input({ required: true }) exercise!: Exercise;

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

import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ExerciseSelectorComponent } from '../exercise-selector/exercise-selector.component';
import { BaseSelectableGroup } from '../../../shared/components/selectable/base-selectable-group';
import { Exercise } from '../exercise.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-group-selector',
  standalone: true,
  imports: [CommonModule, ExerciseSelectorComponent],
  templateUrl: './exercise-group-selector.component.html',
  styleUrl: './exercise-group-selector.component.css',
})
export class ExerciseGroupSelectorComponent extends BaseSelectableGroup {
  @Input({ required: false }) muscleGroup: string = '';
  @Input({ required: true }) exercises!: Array<Exercise>;

  @Input({ required: false })
  override isInteractable: boolean = true;
  @Input({ required: false })
  override canSelectMultiple: boolean = true;
  @ViewChildren(ExerciseSelectorComponent)
  override selectables: QueryList<ExerciseSelectorComponent> = new QueryList();
  @ViewChild('checkbox')
  override checkbox?: ElementRef<HTMLInputElement> = undefined;

  constructor() {
    super();
  }
}

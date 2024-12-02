import {
  Component,
  ElementRef,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ExerciseSelectorComponent } from '../exercise-selector/exercise-selector.component';
import { BaseSelectableGroup } from '../../../shared/components/selectable/base-selectable-group';
import { Exercise } from '../exercise.model';
import { BehaviorSubject } from 'rxjs';
import { ISelectable } from '../../../shared/interfaces/selectable/selectable';

@Component({
  selector: 'app-exercise-selector-group',
  standalone: true,
  imports: [ExerciseSelectorComponent],
  templateUrl: './exercise-selector-group.component.html',
  styleUrl: './exercise-selector-group.component.css',
})
export class ExerciseSelectorGroupComponent extends BaseSelectableGroup {
  @Input({ required: false }) muscleGroup: string = '';
  @Input({ required: true }) exercises!: Array<Exercise>;

  @Input({ required: false }) override canSelectMultiple: boolean = true;
  @ViewChildren(ExerciseSelectorComponent)
  override selectables: QueryList<ExerciseSelectorComponent> = new QueryList();
  @ViewChild('checkbox')
  override checkbox?: ElementRef<HTMLInputElement> = undefined;

  ngAfterViewInit(): void {
    this.init();
  }
}

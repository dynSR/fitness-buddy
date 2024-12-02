import {
  Component,
  ElementRef,
  inject,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IModal } from '../../../../shared/interfaces/modal';
import { Positioner } from '../../../../shared/helpers/positioner';
import { BaseDisplayable } from '../../../../shared/interfaces/displayable/base-displayable';
import { ExerciseSelectorGroupComponent } from '../../../exercise/exercise-selector-group/exercise-selector-group.component';
import { MuscleGroupService } from '../../../muscle-group/muscle-group.service';
import { Precondition } from '../../../../shared/utils/precondition';
import { ExerciseService } from '../../../exercise/exercise.service';
import { Exercise } from '../../../exercise/exercise.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-session-modal',
  standalone: true,
  imports: [ExerciseSelectorGroupComponent],
  templateUrl: './new-session-modal.component.html',
  styleUrls: [
    '../../../../shared/css/modal.css',
    './new-session-modal.component.css',
  ],
})
export class NewSessionModalComponent
  extends BaseDisplayable
  implements IModal
{
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) btnTitle!: string;
  @Input({ required: false }) isCentered: boolean = true;
  @Input({ required: true }) cancelBtnText!: string;
  @Input({ required: true }) validateBtnText!: string;

  @ViewChild('modal') override element?: ElementRef<HTMLDivElement> = undefined;
  @ViewChildren(ExerciseSelectorGroupComponent)
  exerciseSelectorGroups!: QueryList<ExerciseSelectorGroupComponent>;

  override displayedClassName: string = 'modal--displayed';
  override hiddenClassName: string = 'modal--hidden';

  private readonly _router = inject(Router);
  private readonly _positioner = inject(Positioner);
  private readonly _muscleGroupService = inject(MuscleGroupService);
  private readonly _exerciseService = inject(ExerciseService);
  private _selectedExercises: Array<Exercise> = [];

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  override init(): void {
    this.setPosition(this.isCentered);
    super.init();
  }

  setPosition(isCentered: boolean): void {
    Precondition.notNull(
      this.element,
      '[PositionModal] - element is not found, could not position.'
    );

    const modalContent: HTMLDivElement = this.element.nativeElement
      .firstChild as HTMLDivElement;
    this._positioner.centerElementOnXAxis(modalContent);

    if (!isCentered) {
      modalContent.style.marginTop = '2rem';
    } else {
      this._positioner.centerElementOnYAxis(modalContent);
    }
  }

  onValidation(): void {
    this.hide();
    this.exerciseSelectorGroups.forEach((group) => {
      group.selectables
        .filter((s) => s.isSelected)
        .forEach((s) => {
          this._selectedExercises.push(s.exercise);
        });
    });

    this._router.navigate(['session'], {
      queryParams: { exercises: JSON.stringify(this._selectedExercises) },
    });
  }

  get muscleGroups() {
    return this._muscleGroupService.getMuscleGroups();
  }

  hasExercises(muscleGroup: string): boolean {
    return this.getExercisesByMuscleGroup(muscleGroup).length > 0;
  }

  getExercisesByMuscleGroup(muscleGroup: string) {
    return this._exerciseService.getExercisesPerMuscleGroup(muscleGroup);
  }
}

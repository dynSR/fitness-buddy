import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TimeFormatter } from '../../../shared/utils/time-formatter';
import { Exercise } from '../../../models/exercise.model';
import { MuscleGroupService } from '../../muscle-group/muscle-group.service';
import { ExerciseCardComponent } from '../exercise-card/exercise-card.component';
import { SelectableContainer } from '../../../shared/components/selectable/selectable-container.interface';
import { IconTextComponent } from '../../../shared/components/icon/icon-text/icon-text.component';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [CommonModule, ExerciseCardComponent, IconTextComponent],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css',
})
export class ExerciseListComponent
  implements SelectableContainer<ExerciseCardComponent>
{
  @ViewChild('exerciseContainer')
  declare container: ElementRef<HTMLDivElement>;

  @ViewChildren(ExerciseCardComponent)
  selectables!: QueryList<ExerciseCardComponent>;
  @Input({ required: true }) canSelectMultiple: boolean = false;
  @Input({ required: true }) isInteractive: boolean = true;
  // selections: Array<ExerciseCardComponent> = [];

  readonly timeFormatter = inject(TimeFormatter);
  private readonly _muscleGroupService = inject(MuscleGroupService);
  readonly exercises: Array<Exercise> = [
    {
      id: 1,
      name: 'Hammer Curl',
      description:
        'The Hammer Curl is an exercise for the biceps and forearms, performed with dumbbells in a neutral grip. It targets the arm muscles while reducing strain on the wrists.',
      series: 4,
      repetitions: 12,
      recoveryTime: 180,
      muscleGroup: 'Biceps',
    },
    {
      id: 2,
      name: 'EZ Bar Curl',
      description:
        'The EZ Bar Curl is a bicep exercise using a zig-zag bar, which allows for a more comfortable grip and reduces wrist strain. It targets the biceps while promoting proper form.',
      series: 4,
      repetitions: 12,
      recoveryTime: 180,
      muscleGroup: 'Biceps',
    },
    {
      id: 3,
      name: 'Kettlebell Curl',
      description:
        'The Kettlebell Curl is a bicep exercise using a kettlebell, offering a unique grip and movement that targets the biceps while improving forearm strength.',
      series: 4,
      repetitions: 12,
      recoveryTime: 180,
      muscleGroup: 'Biceps',
    },
    {
      id: 4,
      name: 'Triceps Pushdown',
      description:
        'Uses a resistance band anchored to a high point. With elbows close to the body, you pull the handles downward until your arms are fully extended, targeting the triceps.',
      series: 4,
      repetitions: 12,
      recoveryTime: 180,
      muscleGroup: 'Triceps',
    },
    {
      id: 5,
      name: 'EZ Bar Skull Crushers',
      description:
        'Lying on a bench, you hold an EZ bar above your chest, then lower it toward your forehead or slightly behind your head before pressing it back up.',
      series: 4,
      repetitions: 12,
      recoveryTime: 180,
      muscleGroup: 'Triceps',
    },
    {
      id: 6,
      name: 'Overhead Triceps Extension',
      description:
        'Holding a kettlebell behind your head, you extend your arms upward, as if performing a "touchdown" motion.',
      series: 4,
      repetitions: 12,
      recoveryTime: 180,
      muscleGroup: 'Triceps',
    },
  ];

  constructor() {}

  ngAfterViewInit() {
    this.init();
  }

  init(): void {
    if (!this.isInteractive) {
      return;
    }

    this.selectables.forEach((s) => {
      if (!s.canBeSelected) {
        s.disable();
        return;
      }

      s.element.nativeElement.addEventListener('click', () => {
        this.selectOne(s);
      });
    });
  }

  selectOne(selectable: ExerciseCardComponent): void {
    if (this.canSelectMultiple) {
      selectable.toggle();
      return;
    }

    this.unselectAll();
    selectable.select();
  }

  selectAll(): void {
    this.selectables.forEach((s) => {
      if (s instanceof ExerciseCardComponent) {
        s.select();
      }
    });
  }

  unselectAll(): void {
    this.selectables.forEach((s) => {
      if (s instanceof ExerciseCardComponent) {
        s.unselect();
      }
    });
  }

  getMuscleGroups(): Array<string> {
    return this._muscleGroupService.getMuscleGroups();
  }

  getExercisesByMuscleGroup(muscleGroup: string): Array<Exercise> {
    return this.exercises.filter(
      (exercise) => exercise.muscleGroup === muscleGroup
    );
  }

  // TODO: will be deported into a pipe
  isLastIndexOf(array: Array<any>, index: number): boolean {
    return index === array.length - 1;
  }
}

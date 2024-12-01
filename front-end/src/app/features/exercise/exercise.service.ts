import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private readonly _exercises: Array<Exercise> = [
    {
      id: 1,
      name: 'Hammer Curl',
      description:
        'The Hammer Curl is an exercise for the biceps and forearms, performed with dumbbells in a neutral grip. It targets the arm muscles while reducing strain on the wrists.',
      series: 4,
      repetitions: 12,
      weight: 5,
      restTime: 180,
      muscleGroup: 'Biceps',
    },
    {
      id: 2,
      name: 'EZ Bar Curl',
      description:
        'The EZ Bar Curl is a bicep exercise using a zig-zag bar, which allows for a more comfortable grip and reduces wrist strain. It targets the biceps while promoting proper form.',
      series: 4,
      repetitions: 12,
      weight: 5,
      restTime: 180,
      muscleGroup: 'Biceps',
    },
    {
      id: 3,
      name: 'Kettlebell Curl',
      description:
        'The Kettlebell Curl is a bicep exercise using a kettlebell, offering a unique grip and movement that targets the biceps while improving forearm strength.',
      series: 4,
      repetitions: 12,
      weight: 5,
      restTime: 180,
      muscleGroup: 'Biceps',
    },
    {
      id: 4,
      name: 'Triceps Pushdown',
      description:
        'Uses a resistance band anchored to a high point. With elbows close to the body, you pull the handles downward until your arms are fully extended, targeting the triceps.',
      series: 4,
      repetitions: 12,
      weight: 5,
      restTime: 180,
      muscleGroup: 'Triceps',
    },
    {
      id: 5,
      name: 'EZ Bar Skull Crushers',
      description:
        'Lying on a bench, you hold an EZ bar above your chest, then lower it toward your forehead or slightly behind your head before pressing it back up.',
      series: 4,
      repetitions: 12,
      weight: 5,
      restTime: 180,
      muscleGroup: 'Triceps',
    },
    {
      id: 6,
      name: 'Overhead Triceps Extension',
      description:
        'Holding a kettlebell behind your head, you extend your arms upward, as if performing a "touchdown" motion.',
      series: 4,
      repetitions: 12,
      weight: 5,
      restTime: 180,
      muscleGroup: 'Triceps',
    },
  ];

  constructor() {}

  getExercises(): Array<Exercise> {
    return this._exercises;
  }
}

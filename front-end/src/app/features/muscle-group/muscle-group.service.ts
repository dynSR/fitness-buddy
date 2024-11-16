import { Injectable } from '@angular/core';

export enum MuscleGroup {
  Biceps = 'Biceps',
  Triceps = 'Triceps',
  // Chest = 'Chest',
  // Back = 'Back',
  // Shoulders = 'Shoulders',
  // Arms = 'Arms',
  // Legs = 'Legs',
}

@Injectable({ providedIn: 'root' })
export class MuscleGroupService {
  public getMuscleGroups(): Array<string> {
    return Array.from(Object.values(MuscleGroup));
  }
}

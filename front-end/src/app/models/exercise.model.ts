import { Entity } from './entity.model';

export interface Exercise extends Entity {
  id: number;
  name: string;
  description: string;
  series: number;
  repetitions: number;
  recoveryTime: number;
  // equipment: Array<string>;
  // difficulty: number;
  muscleGroup: string;
}

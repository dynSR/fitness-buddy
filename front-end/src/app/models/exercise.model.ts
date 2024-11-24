import { Entity } from './entity.model';

export interface Exercise extends Entity {
  id: number;
  name: string;
  description: string;
  series: number;
  repetitions: number;
  weight: number;
  recoveryTime: number;
  muscleGroup: string;
}

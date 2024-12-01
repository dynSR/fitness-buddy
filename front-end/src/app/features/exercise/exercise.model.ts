import { Entity } from '../../shared/interfaces/entity';

export interface Exercise extends Entity {
  description: string;
  series: number;
  repetitions: number;
  weight: number;
  restTime: number;
  muscleGroup: string;
}

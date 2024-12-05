import { IDisplayable } from './displayable/displayable';

export interface IProgressBar extends IDisplayable {
  min: number;
  max: number;
  value: number;

  set(value: number, max: number): void;
  update(value: number): void;
}

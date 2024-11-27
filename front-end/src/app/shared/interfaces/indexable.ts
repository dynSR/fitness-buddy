import { BehaviorSubject } from 'rxjs';

export interface IIndexable {
  indexElement?: HTMLElement;
  index: number;
  setIndex(newValue: number): void;
  onIndexValueChangeEvent: BehaviorSubject<number>;
}

import { Subject } from 'rxjs';

export interface IIndexable {
  indexElement?: HTMLElement;
  index: number;
  setIndex(newValue: number): void;
  onIndexValueChangeEvent: Subject<number>;
}

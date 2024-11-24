import { IFilter } from '../components/filter/filter-item/filter-item.component';

export interface IFilterable<T extends string | number | Date> {
  appliedFilters: Array<IFilter<T>>;
  handleFilterSelection(eventData: Array<IFilter<T>>): void;
}

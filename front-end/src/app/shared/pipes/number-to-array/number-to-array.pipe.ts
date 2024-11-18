import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToArray',
  standalone: true,
})
export class NumberToArrayPipe implements PipeTransform {
  transform(value: number): Array<number> {
    // Return empty array if no value
    if (!value || isNaN(value) || typeof value !== 'number' || value < 0) {
      return [];
    }

    // Cover array value edge case
    if (Array.isArray(value)) {
      return value;
    }

    return Array(value);
  }
}

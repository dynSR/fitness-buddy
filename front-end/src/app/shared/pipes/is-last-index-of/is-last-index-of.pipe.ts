import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isLastIndexOf',
  standalone: true,
})
export class IsLastIndexOfPipe implements PipeTransform {
  transform(value: number, array: Array<any>): boolean {
    return value === array.length - 1;
  }
}

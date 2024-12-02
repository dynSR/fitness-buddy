import { QueryList } from '@angular/core';

export class Precondition {
  public static notNull<T>(
    value: T | null | undefined,
    message: string = 'Value is null or undefined.'
  ): asserts value is T {
    if (value === null || value === undefined) {
      throw new Error(message);
    }
  }

  public static notNullOrEmpty<T>(
    value: Array<T> | [] | QueryList<T> | null | undefined,
    message: string = 'Value is null or undefined.'
  ): asserts value is Array<T> {
    Precondition.notNull(value, message);

    if (value.length === 0) {
      throw new Error(message);
    }
  }
}

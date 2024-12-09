export class ExtendedArray<T> extends Array<T> {
  constructor(...items: T[]) {
    super(...items);
  }

  first(): T | undefined {
    return this[0];
  }

  last(): T | undefined {
    return this[this.length - 1];
  }

  clear(): void {
    this.splice(0, this.length);
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  add(item: T, beforePush?: () => void, afterPush?: () => void): void {
    if (beforePush) beforePush();
    this.push(item);
    if (afterPush) afterPush();
  }

  addUnique(item: T, beforePush?: () => void, afterPush?: () => void): void {
    if (beforePush) beforePush();
    if (!this.includes(item)) this.push(item);
    if (afterPush) afterPush();
  }

  removeAt(index: number): void {
    if (index < 0 || index >= this.length) return;
    this.splice(index, 1);
  }

  remove(item: T, beforeRemove?: () => void, afterRemove?: () => void): void {
    const index = this.indexOf(item);
    // Corresponding to item not found
    if (index === -1) {
      // console.error(`Item ${item} not found`);
      return;
    }

    if (beforeRemove) beforeRemove();
    this.removeAt(index);
    if (afterRemove) afterRemove();
  }
}

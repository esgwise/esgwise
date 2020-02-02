export class Stack<T> {
    private store: T[] = [];
    push(val: T) {
      this.store.push(val);
    }
    pop(): T | undefined {
      return this.store.pop();
    }

    top(): T | undefined {
      return this.store[this.store.length - 1];
    }
}

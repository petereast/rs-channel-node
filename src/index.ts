export class Channel<T> {
  public queue: T[] = [];
  private maxLength: number = 10;

  private innerGen = function *(): Generator<T | undefined > {
    yield this.queue.shift();
  };

  public push(item: T) {
    this.queue.push(item);
  }

  public pull(): T {
    return this.innerGen().next().value;
  }
  public use(
  ): [(item: T) => void, () => T] {
    return [
      (t) => this.push(t),
      () => this.pull(),
    ];
  }
}

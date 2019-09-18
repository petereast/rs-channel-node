export class Channel<T> {
  innerQueue: Array<T> = [];

  public static open<T>(
    maxLength: number = 10
  ): [(item: T) => void, () => Generator<T>] {
    return [
      function(item: T) {
        if (this.innerQueue.length < maxLength) {
          this.innerQueue.push(item);
        } else {
          // Block until the queue is a bit more empty
          // tslint:disable-next-line
          console.log('too many things!');
        }
      },
      function*(): Generator<T> {
        yield this.innerQueue.shift();
      }
    ];
  }
}

import { Duplex } from "readable-stream";

// I need to implement my own Duplex stream

export class DataStream<T>extends Duplex {

  private queue = new Array<T>();
  constructor() {
    super({objectMode: true});
  }

  _write(chunk, encoding, callback) {
    // Put a thing into a queue
    this.queue.push(chunk);
    // Triggers that it's time to read
    // console.log("_write", {q: this.queue});
    callback();
  }

  _read(_) {
    // Read from the queue and push it into the stream
    if (this.queue.length > 0) {
      const chunk = this.queue.shift();
      // console.log("_read", {chunk, q: this.queue});
      this.push(chunk);
    }
  }
}

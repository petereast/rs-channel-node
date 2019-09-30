import { Duplex } from "readable-stream";

export class DataStream<T> extends Duplex {
  constructor() {
    super({ objectMode: true });
  }

  _write(chunk, encoding, callback) {
    // wooo we don't need our own internal queue!
    this.push(chunk);
    callback();
  }

  _read(_) {
    // Read from the queue and push it into the stream
    // Turns out we don't need a queue at all!
  }
}

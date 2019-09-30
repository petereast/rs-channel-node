import { Readable } from "readable-stream";

export function channel<T>(): [(item: T) => void, () => Promise<T | undefined> ] {
  const stream: Readable = new Readable({objectMode: true});
  stream._read = () => undefined;

  const send = (i: T) => stream.push(i);

  const recv = (): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
      stream.on("data", (data: T) => {
        resolve(data);
      });
    });
  };

  return [send, recv];
}

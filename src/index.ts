import { DataStream } from "./data_stream";

export function channel<T>(
  maxSize: number = 100,
): [(item: T) => void, () => Promise<T>] {
  const stream = new DataStream();

  const send = (i: T) => {
    stream.write(i);
  };

  const recv = (): Promise<T> => {
    return new Promise((resolve, reject) => {
      stream.resume();
      stream.once("data", data => {
        stream.pause();
        resolve(data);
      });
    });
  };

  return [send, recv];
}

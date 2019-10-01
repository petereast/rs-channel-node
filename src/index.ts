import { DataStream } from "./data_stream";

export type Sender<T> = (item: T) => void;
export type Reciever<T> = () => Promise<T>;

export type Channel<T> = [Sender<T>, Reciever<T>];

export function channel<T>(
  maxSize: number = 100,
): Channel<T> {
  const stream = new DataStream();

  const send: Sender<T> = (i: T) => {
    stream.write(i);
  };

  const recv: Reciever<T> = (): Promise<T> => {
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

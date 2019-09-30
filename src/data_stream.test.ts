import { test, TestContext } from "ava-ts";
import { DataStream } from "./data_stream";

test("DataStream works as expected", (t: TestContext) => {
  t.plan(1);
  return new Promise((resolve, reject) => {
    const stream = new DataStream<string>();

    stream.write("some data");

    stream.on("data", (data) => {
      t.deepEqual(data, "some data");
      resolve();
    });
  });
});

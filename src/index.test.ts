import { test, TestContext } from "ava-ts";
import { channel } from ".";

test("A channel blocks until it's got something", async (t: TestContext) => {
  return new Promise((resolve, reject) => {
    const [send, recieve] = channel<string>();
    t.plan(1);
    setTimeout(() => {
      t.pass();
      resolve();
    }, 200);

    const _ = recieve().then(() => t.fail());
  });
});
test.todo("A channel will error if it tries to send without a reciever");
test.todo("The channel can exist across many contexts");

test("functional channels work better", async (t: TestContext) => {
  const [send, recv] = channel<string>();

  send("something");
  send("something");
  send("something");
  send("something");

  const out = [recv(), recv(), recv(), recv()];

  t.deepEqual(
    ["something", "something", "something", "something"],
    await Promise.all(out),
  );
});

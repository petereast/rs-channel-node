import { test, TestContext } from "ava-ts";
import { channel } from ".";

test("A channel blocks until it's got something", async (t: TestContext) => {
  return new Promise((resolve, reject) => {
    const [send, receiver] = channel<string>();
    t.plan(1);
    setTimeout(() => {
      t.pass();
      resolve();
    }, 200);

    const _ = receiver().then(() => t.fail());
  });
});
test.todo("A channel will error if it tries to send without a receiver");
test.todo("The channel can exist across many contexts");

test("functional channels work better", async (t: TestContext) => {
  const [send, recv] = channel<string>();

  send("string 1");
  send("string 2");
  send("string 3");
  send("string 4");

  t.deepEqual("string 1", await recv());
  t.deepEqual("string 2", await recv());
  t.deepEqual("string 3", await recv());
  t.deepEqual("string 4", await recv());
});

test("a channel can be read and written to at the same time", async (t: TestContext) => {
  const [send, recv] = channel<string>();

  send("string 1");
  t.deepEqual("string 1", await recv());
  send("string 2");
  t.deepEqual("string 2", await recv());
  send("string 3");
  t.deepEqual("string 3", await recv());
  send("string 4");
  t.deepEqual("string 4", await recv());
  send("string 5");
  t.deepEqual("string 5", await recv());
});

test("the order doesn't really mattter", async (t: TestContext) => {
  const [send, recv] = channel<string>();

  send("string 1");
  send("string 2");
  t.deepEqual("string 1", await recv());
  t.deepEqual("string 2", await recv());
  send("string 3");
  t.deepEqual("string 3", await recv());
  send("string 4");
  t.deepEqual("string 4", await recv());
  send("string 5");
  t.deepEqual("string 5", await recv());
});

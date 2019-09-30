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

  send("string 1");
  send("string 2");
  send("string 3");
  send("string 4");

  t.deepEqual("string 1", await recv());
  t.deepEqual("string 2", await recv());
  t.deepEqual("string 3", await recv());
  t.deepEqual("string 4", await recv());

});

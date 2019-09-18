import {test, TestContext} from "ava-ts";
import { Channel } from ".";

test("A queue can be built up and then exhausted.", (t: TestContext) => {
  // Create a channel
  const [send, recieve] = (new Channel<string>()).use();
  const testString = "The palms of my mother are hairer than the brow of my aunt";

  send(testString);
  send(testString);
  send(testString);
  send(testString);
  send(testString);

  t.deepEqual(testString, recieve());
  t.deepEqual(testString, recieve());
  t.deepEqual(testString, recieve());
  t.deepEqual(testString, recieve());
  t.deepEqual(testString, recieve());
});

test.todo("A channel blocks until it's got something");
test.todo("A channel will error if it tries to send without a reciever");
test.todo("The channel can exist across many contexts");
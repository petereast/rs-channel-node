import {test, TestContext} from "ava-ts";
import { Channel } from ".";

test("end-to-end", (t: TestContext) => {
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

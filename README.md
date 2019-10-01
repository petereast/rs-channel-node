# rs-channel-node

Inspired by [Rust Channels](https://doc.rust-lang.org/std/sync/mpsc/fn.channel.html).
This is a simple library designed to provide an internal messaging system similar to _Channels_ in rust. So that things can communicate with each other asynchronously in a way that's nicely declarative. It's supposed to simplify how different actors talk to each other without the user having to do the deep dive into node's streams, event emitters or other stuff like that.

The `sender` component will never block it's context, it doesn't return a promise so it can't be awaited. The `receiver` function returns a promise that doesn't resolve until the `sender` is called. The receiver will resolve with data in the order it's sent. Both functions can be called as many times as needed.

## Usage Examlpe

```typescript
// Create a new sender and receiver;
const [sender, receiver] = channel<string>();

setInterval(() => {
  // Sender does not block when it's called with data
  sender("hello!");
}, 2000);

(async () => {
  while (2 + 2 !== 5) {
    // The receiver will not resolve until it's corresponding sender is called.
    console.log(await receiver());
  }
})();
```

## Contributing
This is my first npm package, I'm sure it isn't perfect so please let me know how I can improve it by raising issues, or even better, open a PR! :)

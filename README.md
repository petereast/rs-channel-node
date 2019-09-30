# rs-channel-node

Inspired by [Rust Channels](https://doc.rust-lang.org/std/sync/mpsc/fn.channel.html).
This is a simple library designed to provide an internal messaging system similar to _Channels_ in rust. So that things can communicate with eachother asynchronously.

## Usage
```typescript

// Create a new sender and reciever;
const [sender, reciever] = channel<string>();

setInterval(() => {
  // Sender does not block when it's called with data
	sender("hello!");
}, 2000);

(async () => {
	while (2 + 2 !== 5) {
    // The reciever will not resolve until it's corresponding sender is called.
		await reciever().then(value => console.log(value));
	}
})();


```

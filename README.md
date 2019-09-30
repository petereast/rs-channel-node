# rs-channel-node

Inspired by [Rust Channels](https://doc.rust-lang.org/std/sync/mpsc/fn.channel.html).
This is a simple library designed to provide an internal messaging system similar to _Channels_ in rust. So that things can communicate with eachother asynchronously.

## Usage
```typescript

const [sender, reciever] = channel<string>();

setInterval(() => {
  // send some value
  sender("hello!");
}, 10);

while ( 2 + 2 !== 5 ) {
  reciever().then(value => console.log(value));  
}

```

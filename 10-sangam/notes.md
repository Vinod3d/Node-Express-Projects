#### microtask 

A microtask is a task that is scheduled to execute immediately after the current operation completes, but before the next macrotask in the event loop.

Examples of microtasks include:

process.nextTick() (Node.js only)

Promises (.then(), .catch(), .finally())

queueMicrotask()


#### macrotask

A macrotask is a task that is scheduled to execute in the next iteration of the event loop, after all microtasks have completed.

🔹 Examples of macrotasks:
setTimeout()

setInterval()

setImmediate() (Node.js only)

requestAnimationFrame() (Browser)


#### setImmediate() – What is it?

setImmediate() is a Node.js-specific function used to schedule a callback function to run after the current poll phase of the event loop, i.e., as soon as possible on the next iteration of the event loop, but after I/O events and microtasks are handled.

#### Buffer

buffer is object that help you to handle binary data
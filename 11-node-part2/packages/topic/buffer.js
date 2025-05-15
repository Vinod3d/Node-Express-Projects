const BufferOne = Buffer.alloc(10); // 10 bytes

console.log(BufferOne); // <Buffer 00 00 00 00 00 00 00 00 00 00>

const bufferString = Buffer.from('Hello World!'); // Create a buffer from a string
console.log(bufferString); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>

const bufferFromArray = Buffer.from([1, 2, 3, 4, 5]); // Create a buffer from an array
console.log(bufferFromArray); // <Buffer 01 02 03 04 05>
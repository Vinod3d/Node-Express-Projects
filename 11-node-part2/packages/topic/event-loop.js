// const fs = require('fs');
import fs from 'fs';
// const crypto = require('crypto');
import crypto from 'crypto';

console.log('File started 1');

setTimeout(() => {
    console.log('Timeout 1');
}, 0);

setTimeout(() => {
    console.log('Timeout 2');
}, 0);

setImmediate(() => {
    console.log('set Immediate Callback 1');
});

Promise.resolve().then(() => {
    console.log('Promise resolved microtask 1');
});

process.nextTick(() => {
    console.log('Next tick microtask 2');
});

fs.readFile(__filename, ()=> {
    console.log('File read 1');
});

crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', (err, key) => { //
    if (err) throw err;
    console.log('Hash 1', key.toString('hex'));
});

console.log('End of script 1');
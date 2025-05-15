// readable st
// writable stream
// duplex stream
// transform stream
// const fs = require('fs');
import fs from 'fs';
// const zlib = require('zlib'); // compression gzip
import zlib from 'zlib'; // compression gzip
// const crypto = require('crypto');
import crypto from 'crypto'; // encryption
// const {Transform} = require('stream');
import { Transform } from 'stream'; // transform stream

class EncryptStream extends Transform {
    constructor(key, vector) {
        super();
        this.key = key;
        this.vector = vector;
    }

    _transform(chunk, encoding, callback) {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
        const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]);
        this.push(encrypted.toString('hex'));
        callback();
    }
}

const key = crypto.randomBytes(32); // 256 bits
const vector = crypto.randomBytes(16); // 128 bits

const readableStream = fs.createReadStream('input.txt', {encoding: 'utf8'});


const gZipStream = zlib.createGzip();
const encryptStream = new EncryptStream(key, vector);
const writableStream = fs.createWriteStream('output.txt.gz', {encoding: 'utf8'});

readableStream.pipe(gZipStream).pipe(encryptStream).pipe(writableStream);

console.log("Streaming, > compressing, > writing to file...")
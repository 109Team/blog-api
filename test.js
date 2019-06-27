const net = require('net');

let con = net.connect({
    host: '116.62.56.222',
    port: 5044
},function(){
    console.log('=======');
})

con.on("error", (err) => {
    console.error(`logstash Error with the connection to`, err);
    // From docs: "The close event will be called just after this one
});

con.on("connection", (err) => {
    console.info(`connection`, err);
    // From docs: "The close event will be called just after this one
});


const secret = 'secret';

const headerBuffer = Buffer.from(JSON.stringify({
    "alg": "HS256",
    "typ": "JWT"
}));
const header = headerBuffer.toString("base64");

const payloadBuffer = Buffer.from(JSON.stringify({
    "_id": "yhsuaewe2323"
}));
const payload = payloadBuffer.toString("base64");

const crypto = require("crypto");

const signature = crypto.createHmac('sha256',secret)
    .update(`${header}.${payload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

console.log(`${header}.${payload}.${signature}`)

// ----ELOQUENT JS NODE JS-----------------------------------------------------------------------------

// The HTTP module-----------------------------------------------

// Example basic server:
const {createServer} = require('http');

let server = createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(`
    <h1>Hello!</h1>
    <p>You asked for <code>${request.url}</code></p>`);
  res.end();
});

server.listen(8000);
console.log("Listening! (port 8000");


// To act as HTTP client, use request function in HTTP module:
const {request} = require("http");

// request(configObject, callbackWhenResponseComesIn)
let requestStream = request({
  hostname: "eloquentjavascript.net",     // what server to talk to
  path: "/20_node.html",                  // what path to request from that server
  method: "GET",                          // what method to use
  headers: {Accept: "text/html"}          // what headers
}, response => {
  console.log("Server responded with status code", response.statusCode);
});

requestStream.end();

// Could use http's "node-fetch" module for promise-based interface like broswer's "fetch"



// Streams-----------------------------------------------
// writeable streams - objects like req & res
// have write method & end method

// readable streams - Server reads req then writes response 
// File can be read as readable stream using createReadStream function from 'fs'
// Objects that emit events in Node have "on" method, similar to browser's "addEventListener"

// This creates a server that reads req bodies and streams them back to client...
// ...as all uppercase text:
const {createServer} = require('http');

createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.on("data", chunk =>
    res.write(chunk.toString().toUpperCase()));
  res.on("end", () => res.end());
}).listen(8000);

// Then, send a request to the uppercasing server & write response received:
const {request} = require('http');

request({
  hostname: "localhost",
  port: 8000,
  method: "POST"
}, res => {
  res.on("data", chunk =>   // when data comes in, run this callback
    process.stdout.write(chunk.toString()));
}).end('Hello Server');

// --> HELLO SERVER
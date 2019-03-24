var http = require("http");
var express = require("express");

var fs = require("fs");

var app = express();

app.use(express.static("public"));

app.get("/hello", function(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello Sandeep\n");
});

app.get("/msg", function(req, res) {
  let data = [];
  req.on("data", chunk => {
    data.push(chunk);
  });
  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "text/json" });
    response = {
      first_name: "Sandeep",
      last_name: "Parkhande"
    };
    console.log(response);
    res.end(JSON.stringify(response));
  });
});

app.get("/index.htm", function(req, res) {
  res.sendFile(__dirname + "/" + "index.htm");
});

app.get("/processJson", intercept, function(req, res) {
  // Prepare output in JSON format
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
// Sync code
var data = fs.readFileSync("input.txt");

// NonBlocking Code

fs.readFile("input.txt", function(err, data) {
  if (err) return console.error(err);
  console.log(data.toString());
});

function intercept(request, response, next) {
  console.log(" Call Intercepted");
  next();
}

console.log("Hi Node Js App");
console.log(data.toString());
console.log("Program Ended");
console.log(__filename);

// Console will print the message
console.log("Server running at http://127.0.0.1:8081/");

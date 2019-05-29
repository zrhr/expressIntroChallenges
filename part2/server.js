var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var port = process.env.PORT || 8000;
let tempArray = [];
let temp2 = "";
app.get("/yourroute", function(req, res) {
  res.send("stuff");
});
app.post("/create/:name/:age", (req, res) => {
  let temporary = { name: req.params.name, age: req.params.age };
  let temp = fs.readFileSync(path.join(__dirname, "/storage.json"), "utf-8");

  if (temp.length === 0) {
    tempArray.push(temporary);
    temp2 = JSON.stringify(tempArray);
  } else {
    tempArray = JSON.parse(temp);
    tempArray.push(temporary);
    temp2 = JSON.stringify(tempArray);
  }
  console.log(temp2);
  fs.writeFileSync(path.join(__dirname, "/storage.json"), temp2);

  res.send("success");
});
app.get("/", function(req, res) {
let temp = fs.readFileSync(path.join(__dirname, "/storage.json"), "utf-8");
  res.send(temp);
});
app.get("/:name", function(req, res) {
let temp = fs.readFileSync(path.join(__dirname, "/storage.json"), "utf-8");
 tempArray = JSON.parse(temp);
 for(let i=0; i<tempArray.length; i++)
 {
   if(req.params.name==tempArray[i].name)
   res.send(JSON.stringify(tempArray[i]))
 }
 res.sendStatus(400)
});


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log("Listening on port", port);
});

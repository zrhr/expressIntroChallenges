var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});
app.get('/hello', (req, res)=>{
  res.send("Hello!")
})
app.post('/create/:name', (req,res)=>{
 res.json({"id":1, "name":req.params.name})
})
app.get('/',(req,res)=>{
  res.sendFile("/index.html", {root: __dirname})
})
app.get('/verify/:age',(req,res)=>{
  if(req.params.age>13)
  res.sendStatus(200);
  else {
    res.sendStatus(403);
  }
})
app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

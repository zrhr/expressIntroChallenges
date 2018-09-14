const express = require('express');
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8000;


//
// ## Part Two:
//
// ### Challenge 1:
// Create a POST route for "/create/:name/:age" that creates an object that looks like this:
// {
//   "name": "troy",
//   "age": 21
// }
// Then take that object and insert it into storage.json
        // /create/frank/5093
app.post('/create/:name/:age', (req, res)=>{
  let user = {
    name: req.params.name,
    age: parseInt(req.params.age)
  }

  let rawContents = fs.readFileSync('./storage.json', 'utf8');
  let content = JSON.parse(rawContents)
  content.push(user);
  console.log(content);
  fs.writeFileSync('./storage.json', JSON.stringify(content));
  res.send('done');
})


// ### Challenge 2:
// Create a Get route for "/" that returns all of the objects inside storage.json.
app.get('/', (req, res)=>{
  let rawContents = fs.readFileSync('./storage.json', 'utf8');
  res.json(JSON.parse(rawContents));
})
// ### Challenge 3:
// Create a Get route for "/:name" that returns the first object in storage.json that matches the name. If there is no object in storage.json that matches then return a 400 status.
app.get('/:name', (req, res)=>{
  let rawContents = fs.readFileSync('./storage.json', 'utf8');
  let content = JSON.parse(rawContents)
  let result = content.filter(item => item.name === req.params.name)[0];
  if(result){
    res.json(result)
  }else{
    res.sendStatus(400);
  }
})
app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

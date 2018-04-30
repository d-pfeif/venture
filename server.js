const express = require('express');
const path = require('path')

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

// const index = require('./public/views/index.html');

app.listen(port, (req,res)=>{
  console.log("Listening on port: "+port);
})

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, './public/views/index.html'))
})

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(express.static(__dirname + '/public'));
const activityAPI = require('./app/modules/activities/server/routes/activities.routes.js');

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

app.listen(port, (req,res)=>{
  console.log("Listening on port: "+port);
})

app.use('/api/activities', activityAPI)

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, './public/views/index.html'))
})

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'))
const activityAPI = require('./app/modules/activities/activities.routes.js')
const userAPI = require('./app/modules/users/user.routes.js')
const userActsAPI = require('./app/modules/userActs/userActs.routes.js')
const db = require('./config/database.js')

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Use cookies to allow continuous user login.
app.use(cookieParser())
app.use(cookieSession({
  name: 'venture',
  secret: db.secret,
  httpOnly: false,

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.listen(port, (req,res)=>{
  console.log("Listening on port: "+port);
})

app.use('/api/activities', activityAPI)
app.use('/api/users', userAPI)
app.use('/api/userActs', userActsAPI)

app.get('*', (req,res)=>{
  // console.log(req.session.user);
  res.sendFile(path.join(__dirname, './public/views/index.html'))
})

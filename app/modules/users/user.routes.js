const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.MONGOLAB_URI)

var users = require('./user.controller.js')

router.route('/')
.get(users.list)
.post(users.create);

router.route('/login')
.post(users.login)

router.route('/logout')
.get((req,res)=>{
  req.session = null
  res.redirect('/')
})

router.route('/:userId')
.get(users.read)
.put(users.update)
.delete(users.delete);

router.param('userId', users.userByID);

module.exports = router

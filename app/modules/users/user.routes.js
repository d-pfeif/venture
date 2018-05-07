const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

mongoose.connect('mongodb://doxyc:Auryx289@ds117250.mlab.com:17250/venture')

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

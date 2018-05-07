const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

mongoose.connect('mongodb://doxyc:Auryx289@ds117250.mlab.com:17250/venture')

var userActs = require('./userActs.controller.js')

router.route('/')
.post(userActs.create);

router.route('/:userId')
.get(userActs.list);

router.route('/:userId/:userActsId')
.delete(userActs.delete);

module.exports = router

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const db = require('./../../../config/database.js')

mongoose.connect(db.database)

var userActs = require('./userActs.controller.js')

router.route('/')
.post(userActs.create);

router.route('/:userId')
.get(userActs.list);

router.route('/:userId/:userActsId')
.delete(userActs.delete);

module.exports = router

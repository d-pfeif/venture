const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.MONGOLAB_URI)

var userActs = require('./userActs.controller.js')

router.route('/')
.post(userActs.create);

router.route('/:userId')
.get(userActs.list);

router.route('/:userId/:userActsId')
.delete(userActs.delete);

module.exports = router

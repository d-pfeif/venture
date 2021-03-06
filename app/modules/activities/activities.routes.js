const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.MONGOLAB_URI)

var activities = require('./activities.controller.js')

router.route('/')
.get(activities.list)
.post(activities.create);

router.route('/:activityId')
.get(activities.read)
.put(activities.update)
.delete(activities.delete);

router.param('activityId', activities.activityByID);

module.exports = router

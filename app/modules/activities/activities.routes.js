const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const db = require('./../../../config/database.js')

mongoose.connect(db.database)

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

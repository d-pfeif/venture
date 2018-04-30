'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  // errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  actModel = require('../models/activities.model.js'),
  Activity = mongoose.model("Activity");

/**
 * Create a Activity
 */
exports.create = function (req, res) {
  var activity = new Activity(req.body);

  activity.save((err)=>{
    if(err){
      res.status(400).send(err)
    } else {
      res.status(201).json(activity)
    }
  })
};

/**
 * Show the current Activity
 */
exports.read = function (req, res) {
  Activity.findById(req.params.activityId).exec(function(err, activity){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      })
    } else {
      if(!activity) {
        return res.status(404).send({
          message: "Activity not found!"
        });
      }
      res.json(activity)
    }
  })
};

/**
 * Update a Activity
 */
exports.update = function (req, res) {
  // console.log(req.activity);
  console.log("req.body: " + req.body);
  var activity = req.activity;

  activity = _.extend(activity, req.body);

  activity.save((err)=>{
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      })
    } else {
      res.json(activity);
    }
  })
};

/**
 * Delete an Activity
 */
exports.delete = function (req, res) {
  var activity = req.activity;

  activity.remove((err)=>{
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      })
    } else {
      res.json(activity)
    }
  })
};

/**
 * List of Activities
 */
exports.list = function (req, res) {
  Activity.find().exec(function(err, activities){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      })
    } else {
      res.json(activities)
    }
  })
};

/**
 * Activity middleware
 */
exports.activityByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Activity is invalid'
		});
	}

	Activity.findById(id).exec(function(err, activity) {
		if (err) return next(err);
		if (!activity) {
			return res.status(404).send({
  				message: 'Activity not found'
  			});
		}
		req.activity = activity;
		next();
	});
};

'use strict';

// Module dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// User Activities Schema
var UserActsSchema = new Schema({
  activityName: {
    type: String,
    required: "Need activity name."
  },
  activity_type: [{type: String}],
  activityId: {
    type: String,
    required: "Need activity id."
  },
  userId: {
    type: String,
    required: "Need users id."
  }
})

module.exports = mongoose.model('UserActs', UserActsSchema);

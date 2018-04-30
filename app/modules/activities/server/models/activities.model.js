'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
  // Activity model fields
  // ...
  validated: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    trim: true,
    required: 'name cannot be blank',
    unique: true,
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  location: {
    lat: {
      type: Number,
      default: 0
    },
    long: {
      type: Number,
      default: 0
    },
    city: {
      type: String,
      trim: true,
      required: 'city cannot be blank'
    },
    state: {
      type: String,
      required: 'state cannot be blank',
      trim: true
    }
  },
  activity_type: [{type: String}]
});

module.exports = mongoose.model('Activity', ActivitySchema);

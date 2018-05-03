'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
/**
 * User Schema
 */
var UserSchema = new Schema({

  // User model fields
  // ...
  created: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    required: 'First name cannot be blank'
  },
  lastName: {
    type: String,
    required: 'Last name cannot be blank'
  },
  username: {
    type: String,
    trim: true,
    required: 'username cannot be blank',
    unique: true,
  },
  password: {
    type: String,
    required: 'password cannot be blank'
  },
  role: {
    type: String,
    default: 'user',
  }
});


module.exports = mongoose.model('User', UserSchema);

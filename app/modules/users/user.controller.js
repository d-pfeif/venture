'use strict';

const bcrypt = require('bcrypt');

/**
* Module dependencies.
*/
var path = require('path'),
mongoose = require('mongoose'),
_ = require('lodash'),
userModel = require('./user.model.js'),
User = mongoose.model("User");

/**
* Create a User
*/
exports.create = function (req, res) {
  var user = new User();
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName
  user.username = req.body.username
  if(req.body.password == req.body.password2){
    bcrypt.hash(req.body.password, 10, function(err, hash){
      user.password = hash

      user.save((err)=>{
        if(err){
          res.status(400).send(err)
        } else {
          res.redirect('/')
        }
      })
    })
  } else {
    res.status(400)
  }
};

/**
* Show the current User
*/
exports.read = function (req, res) {
  User.findById(req.params.userId).exec(function(err, user){
    if(err){
      return res.status(400).send(err)
    } else {
      if(!user) {
        return res.status(404).send({
          message: "User not found!"
        });
      }
      res.json(user)
    }
  })
};

/**
* Update a User
*/
exports.update = function (req, res) {
  // console.log(req.User);
  console.log("req.body: " + req.body);
  var user = req.user;

  user = _.extend(user, req.body);
  console.log(user);
  bcrypt.hash(user.password, 10, function(err, hash){
    user.password = hash
    user.save((err)=>{
      if(err){
        return res.status(400).send(err)
      } else {
        req.session.user = user
        res.redirect('/profile');
      }
    })

  })
};

/**
* Delete an User
*/
exports.delete = function (req, res) {
  var user = req.user;

  user.remove((err)=>{
    if(err){
      return res.status(400).send(err)
    } else {
      res.json(user)
    }
  })
};

/**
* List of Users
*/
exports.list = function (req, res) {
  User.find().exec(function(err, users){
    if(err){
      return res.status(400).send(err)
    } else {
      res.json(users)
    }
  })
};

/**
* Login to User
*/
exports.login = function(req,res){
  User.find({username: req.body.username}).exec(function(err, user){
    if(err){
      return res.status(400).send(err)
    } else if (user.length == 0) {
      return res.status(400)
    } else {
      bcrypt.compare(req.body.password, user[0].password, function(err, response){
        if (response == true) {
          req.session.user = user[0]
          return res.redirect('/')
        } else {
          return res.status(401)
        }
      })

    }
  })
}

/**
* User middleware
*/
exports.userByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id).exec(function(err, user) {
    if (err) return next(err);
    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      });
    }
    req.user = user;
    next();
  });
};

'use strict';

// load dependencies
var path = require('path'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  userActModel = require('./userActs.model.js'),
  UserActs = mongoose.model('UserActs')

exports.create = function(req,res){
  UserActs.find({userId: req.body.userId}).exec(function(err, userActs){
    if(err){
      return res.status(400).send(err)
    } else {
      let exists = false
      for (var i = 0; i < userActs.length; i++) {
        if(userActs[i].activityId == req.body.activityId){
          exists = true
        }
      }
      if(!exists){
        var userAct = new UserActs(req.body);
        userAct.save((err)=>{
          if(err){
            res.status(400).send(err)
          } else {
            res.redirect('/profile')
          }
        })
      } else {
        res.redirect('/')
      }
    }
  })

};

exports.list = function(req,res){
  UserActs.find({userId: req.params.userId}).exec(function(err, userActs){
    if(err){
      return res.status(400).send(err)
    } else {
      res.json(userActs)
    }
  })
};

exports.delete = function (req, res) {
  UserActs.findByIdAndRemove(req.params.userActsId, function(err){
    if(err){
      return res.status(400).send(err)
    } else {
      return res.redirect('/#!user/'+req.params.userId)
    }
  })
};

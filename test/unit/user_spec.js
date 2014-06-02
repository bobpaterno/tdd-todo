/* global describe, it, before */
/* jshint expr:true */
'use strict';

process.env.DBNAME = 'todo-test';
var expect = require('chai');
var Mongo = require('mongodb');
var app = require('../../app/app');
var request = require('supertest');
var traceur = require('traceur');
var User;



describe('User', function(){
  //before, after, beforeEach, afterEach

  before(function(done){
    request(app)
    .get('/')
    .end(function(){
      User = traceur.require(__dirname + '/../../app/models/user.js');
      done();
    });
  });

  describe('.register', function(){
    it('should successfully register a user', function(){
      var obj = {email:'bob@p.com', password:'asdf'};
      User.register(obj, function(u){
        expect(u).to.not.be.null;
        expect(u).to.be.an.instanceof(User);
        expect(u._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(u.password).to.not.equal('asdf');
      });
    });
  });


});

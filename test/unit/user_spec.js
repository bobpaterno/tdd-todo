/* global describe, it, before, beforeEach */
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

  beforeEach(function(done){
    console.log('before Each');
    global.nss.db.collection('users').drop(done);
  });

  describe('.register', function(){
    before(function(done){
      //create a user named sally
      done();
    });

    it('should successfully register a user', function(done){
      console.log('IT 1');
      var obj = {email:'bob@p.com', password:'asdf'};
      User.register(obj, function(u){
        expect(u).to.be.ok;
        expect(u).to.be.an.instanceof(User);
        expect(u._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(u.password).to.not.equal('asdf');
        done();
      });
    });

    it('should not successfully register a user', function(done){
      console.log('IT 2');
      done();
      // var obj = {email:'sally@p.com', password:'asdf'};
      // User.register(obj, function(u){
      //   expect(u).to.be.null;
      //   expect(u).to.be.an.instanceof(User);
      //   expect(u._id).to.be.an.instanceof(Mongo.ObjectID);
      //   expect(u.password).to.not.equal('asdf');
      //   done();
      // });
    });


  });


});

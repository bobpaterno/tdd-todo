/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'todo-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var app = require('../../app/app');
var request = require('supertest');
var traceur = require('traceur');
var User;
var Task;
var t1, t2, t3;
var sue, bad;


describe('Task', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(){
      Task = traceur.require(__dirname + '/../../app/models/task.js');
      User = traceur.require(__dirname + '/../../app/models/user.js');
      done();
    });
  });

  describe('.create', function(){
    it('should successfully create a task', function(done){
      Task.create(sue._id, {title:'title', date:new Date(), color:'red'}, function(t){
        expect(t).to.be.ok;
        expect(t).to.be.an.instanceof(Task);
        expect(t._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(t.color).to.equal('red');
        expect(t.due).to.be.instanceof(Date);
        done();
      });
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      global.nss.db.collection('tasks').drop(function(){
        User.register({email:'sue@aol.com', password:'abcd'}, function(u1){
          User.register({email:'bad@aol.com', password:'abcd'}, function(u2){
            Task.create(u1._id, {title:'title', date:new Date(), color:'blue'}, function(task1){
              Task.create(u2._id, {title:'title2', date:new Date(), color:'black'}, function(task2){
                Task.create(u1._id, {title:'title3', date:new Date(), color:'white'}, function(task3){
                  sue = u1;
                  bad = u2;
                  t1 = task1;  // sue
                  t2 = task2;
                  t3 = task3;  // sue
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('#destroy', function(){
    it('should delete a record from the Task collection', function(done){
      t1.destroy(function(){
        Task.findByUserId(sue._id.toString(), function(tasks){
          expect(tasks.length).to.equal(1);
          done();
        });
      });
    });
  });

  describe('.findByUserId', function(){
    it('should find all tasks by userId', function(done){
      Task.findByUserId(sue._id.toString(), function(tasks){
        expect(tasks[0].userId).to.eql(sue._id);
        expect(tasks.length).to.equal(2);
        expect(tasks[1].color).to.equal('white');
        expect(tasks[0].color).to.equal('blue');
        expect(tasks).to.be.instanceof(Array);
        done();
      });
    });

    it('should find any tasks by bads userId', function(done){
      Task.findByUserId(bad._id.toString(), function(tasks){
        expect(tasks.length).to.equal(1);
        expect(tasks[0].userId).to.eql(bad._id);
        done();
      });
    });

    it('should not find any tasks. at all.', function(done){
      Task.findByUserId('123456789012', function(tasks){
        expect(tasks).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a task by its id', function(done){
      Task.findById(t1._id.toString(), function(t){
        expect(t).to.be.instanceof(Task);
        expect(t).to.have.property('userId');
        expect(t).to.have.property('_id');
        expect(t._id).to.eql(t1._id);
        done();
      });
    });
  });

  describe('#toggleComplete', function(){
    it('should toggle isComplete', function(){
      var prev = t1.isComplete;
      t1.toggleComplete();
      expect(t1.isComplete).to.equal(!prev);
    });
  });

  describe('#save', function(){
    it('should save it yo', function(done){
      t2.title = 'Hello tharr';
      t2.save(function(){
        Task.findById(t2._id.toString(), function(foundTask){
          expect(foundTask.title).to.equal('Hello tharr');
          done();
        });
      });
    });
  });

  describe('#update', function() {
    it('should update any of the following, title, due, color', function(done){
      Task.findById(t3._id.toString(), function(task){
        task.update({title:'Edit Title3', due:new Date(), color:'purple'});
        expect(task.title).to.equal('Edit Title3');
        expect(task.color).to.equal('purple');
        done();
      });
    });
  });



});

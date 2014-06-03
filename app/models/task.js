var taskCollection = global.nss.db.collection('tasks');
var Mongo = require('mongodb');
var _ = require('lodash');

class Task{

  static create(userId, obj, fn){
    if(typeof(userId)==='string'){
      userId = Mongo.ObjectID(userId);
    }
    var task = new Task();
    task.title = obj.title;
    task.due = obj.date;
    task.color = obj.color;
    task.isComplete = false;
    task.userId = userId;
    taskCollection.save(task, (e,t)=>fn(t));
  }

  static findById(userId, fn){
    if(userId.length !== 24){fn(null); return;}

    userId = Mongo.ObjectID(userId);
    taskCollection.findOne({_id:userId}, (e,task)=>{
      if(task){
        task = _.create(Task.prototype, task);
        fn(task);
      }else{
        fn(null);
      }
    });
  }

  static findByUserId(userId, fn) {
    userId = Mongo.ObjectID(userId);
    taskCollection.find({userId:userId}).toArray((e,tasks)=>{
      if(tasks.length) { fn(tasks); }
      else { fn(null); }
    });
  }

  destroy(fn){
    taskCollection.findAndRemove({_id:this._id}, ()=>fn());
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  save(fn) {
    taskCollection.save(this, ()=>fn() );
  }

}

module.exports = Task;

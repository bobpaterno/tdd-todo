'use strict';

var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
// var Mongo = require('mongodb');


class User {
  static register(obj, fn) {
    var user = new User();
    user.email = obj.email;
    user.password = bcrypt.hashSync(obj.password, 8);
    users.save(user,()=>fn(user));
  }
  // static register(obj, fn) {
  //   users.findOne({email:obj.email}, (err,user)=>{
  //     if(user) {
  //       if(bcrypt.compareSync(obj.password,user.password)) {
  //         fn(user);
  //       }
  //       else {
  //         fn(null);
  //       }
  //     }
  //     else {
  //       obj.password = bcrypt.hashSync(obj.password,8);
  //       users.save(this, (e,u)=>{
  //         fn(u);
  //       });
  //     }
  //   });
  // }

}

module.exports = User;

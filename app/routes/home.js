'use strict';

exports.index = (req, res)=>{
  console.log('-----Home index --------');
  res.render('home/index', {title: 'To Do Home Page'});
};

exports.login = (req, res)=>{
console.log('-----Login  --------');
  res.render('home/login', {});
};

exports.register = (req, res)=>{
console.log('-----Register --------');
  res.render('home/register', {});
};

exports.authenticate = (req, res)=>{
console.log('-----Authenticate index --------');
  res.redirect('tasks/index');
};

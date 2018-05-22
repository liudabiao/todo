var express = require('express');
var router = express.Router();
var users = require('../modules/users')
var mongoose = require('mongoose')

//连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/ldb');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

//GET 用query取参数 注册时检测昵称是否存在
router.get('/nickname', (req, res, next) => {
  users.find({"nickname": req.query.nickname}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
});

//注册时检测 用户名是否已经存在
router.get('/username', (req, res, next) => {
  users.find({"username": req.query.username}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
});

//注册
router.post('/signup', (req, res, next) => {
  var param = {
    username: req.body.username,
    password: req.body.password,
    nickname: req.body.nickname
  };;
  users.create(param, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'success'
      })
    }
  })
});

//忘记密码
router.get('/forget', (req, res, next) => {
  users.find({username: req.query.username}, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
});

//获取登陆用户的TODOlist
router.get('/todo', (req, res, next) => {
  users.find({username: req.query.username, })
});

//post用body取参数 登陆
router.post('/login', function(req, res, next) {
  var param = {
    username: req.body.username,
    password: req.body.password
  };
  users.find(param, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      console.log(doc);
      if(doc.length > 0) {
        res.cookie("username",doc.username,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("nickname",doc.nickname,{
          path:'/',
          maxAge:1000*60*60
        });
        res.json({
          status:'0',
          msg:'',
          result: doc
        });
      } else {
        res.json({
          status: '2',
          msg: ''
        })
      }
    }
  })
});

//检查当前用户是否登陆 通过cookies
router.get('/checklogin', (req, res, next)=> {
  if(req.cookies.username) {
    res.json({
      status: '0',
      msg: '',
      result: {
        nickname: req.cookies.nickname||'游客',
        username: req.cookies.username
      }
    });
  } else {
    res.json({
      status: '1',
      msg: 'no sign in',
      result: ''
    });
  }
});

module.exports = router;

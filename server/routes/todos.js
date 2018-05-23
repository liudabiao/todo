var express = require('express');
var router = express.Router();
var todo = require('../modules/todos')

//查询用户的TODO-list
router.get('/search', (req, res, next) => {
  let page = parseInt(req.query.page);
  const pageSize = 8;
  let skip = (page - 1) * pageSize;
  const params = {
    username: req.query.username,
    date: req.query.date
  };
  let todoModel = todo.find(params).skip(skip).limit(pageSize);
  todoModel.exec((err, doc) => {
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

//插入用户新建的TODO-ITEM
router.post('/insert', (req, res, next) => {
  const param = {
    date: req.body.date,
    username: req.body.username,
    title: req.body.title,
    content: req.body.content,
    status: false
  };
  todo.create(param, (err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      todo.find({username: req.body.username, date: req.body.date}, (err, doc) => {
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
    }
  })
});

module.exports = router;

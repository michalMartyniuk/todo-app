const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const updater = require('../utils');

router.get('/', (req, res) => {
  
});

router.get('/todos/get', ensureToken, (req, res) => {
  res.json({
    todos: req.user.todos
  })
})

router.post('/todo/complete', ensureToken, (req, res) => {
  const todos = req.user.todos.map( todo => {
    if(todo.id === req.body.id) {
      todo.complete = true;
    }
    return todo;
  })
  updater(User, req.user.id, 'todos', todos)
    .then( user => {
      res.json({ todos: user.todos })
    })
    .catch( error => res.status(500).send(error));
})

router.post('/todo/add', ensureToken, (req, res) => {
  const todos = req.user.todos.concat({
     id: req.body.id,
     text: req.body.text,
     complete: false,
     edit: false
  })
  updater(User, req.user.id, 'todos', todos)
    .then( user => {
      res.json({ todos: user.todos })
    })
    .catch( error => res.status(500).send(error));
})

router.post('/todo/remove', ensureToken, (req, res) => {
  const todos = req.user.todos.filter( todo => {
    return todo.id !== req.body.id
  });
  updater(User, req.user.id, 'todos', todos)
    .then( user => {
      res.json({ todos: user.todos })
    })
    .catch( error => res.status(500).send(error));
})

router.post('/todo/update', ensureToken, (req, res) => {
  const todos = req.user.todos.map( todo => {
    if(todo.id === req.body.id) {
      if(todo.edit === true) todo.text = req.body.text;
      todo.edit = !todo.edit;
    }
    return todo
  })
  updater(User, req.user.id, 'todos', todos)
    .then( user => {
      res.json({ todos: user.todos })
    })
    .catch( error => res.status(500).send(error))
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) res.status(500).send(err);
    if(!user) res.status(500).send("User not found");
    else {
      const token = jwt.sign(user.id, keys.JWT_SECRET);
      res.json({token, todos: user.todos});
    }
  })
})

router.post('/signup', (req, res) => {
  User.create({ 
    email: req.body.email, 
    password: req.body.password
   }, (err, user) => {
    if(err) res.status(500).send(err);
    else {
      const token = jwt.sign(user.id, keys.JWT_SECRET);
      res.json({token, todos: user.todos})
    }
  })
})

function ensureToken (req, res, next) {
  const authorization = req.headers["authorization"];
  if(authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, keys.JWT_SECRET, (err, userID) => {
      if(err) res.send(500, err);
      else {
        User.findById( userID, (err, user) => {
          if(err) res.send(500, err);
          if(!user) res.send(500, "User not found");
          else {
            req.user = user;
            next();
          }
        })
      }
    }) 
  }
  else {
    res.send(403, "You are not authorized");
  }
}


module.exports = router;
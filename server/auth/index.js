const express = require('express');

const Router = express.Router();

const userSchema = require('../model/user');
const usersCollection = require('../model/users-collections');

Router.get('/', (req, res) => {
  res.json({
    message: `Current number of records: ${usersCollection.length}`
   });
});

Router.post('/signup', (req, res) => {
  // [x] check if the user input is valid.
  // [x] save to array if all conditions are meet.
  const data = userSchema.validate(req.body);
  if (data.error == null) {
    // [x] insert into array.
    // [x] check if the username is already taken.
    const isUsernameTaken = usersCollection.find(e => e.username == req.body.username);
    if (isUsernameTaken == undefined) {
      usersCollection.push(req.body);
      res.json({
        message: `${req.body.username} added to our array`
      });
    } else {
      res.json({
        message: `${req.body.username} is already taken`
      });
    }
  } else {
    res.json({ message: 'Invalid' });
  }
});

module.exports = Router;

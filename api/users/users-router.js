// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const express = require('express');
const Users = require('./users-model');
const {restricted} = require('../auth/auth-middleware');

const router = express.Router();

router.get('/',restricted, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch(err) {
    next(err);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong with the server',
    stack: err.stack
  });
});

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */



// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../models');
const queryUser = require('../util/queryUser');

router.get('/', (req, res) => {

  res.render('password', {
    pageTitle: 'password'
  });
});

router.post('/', async (req, res) => {

  try {
    const userInfo = req.session.info;
    userInfo.password = req.body.password;
    userInfo.email = userInfo.email.toLowerCase();
    const emailExist = await queryUser.emailExist(db.User, userInfo.email);

    if (emailExist) {
      req.session.emailExist = true;
      res.redirect('/register');
      return;
    }

    await db.User.create(userInfo);
    res.redirect('/');

  } catch (err) {
    console.log('\n***** There was an error: *****\n', err.message, '\n**********\n');
    res.redirect('/register')
  }

  return;
});

module.exports = router;

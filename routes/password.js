const express = require('express');
const router = express.Router();
const db = require('../models');
const queryUser = require('../util/queryUser');
const Cookies = require('cookies');

router.get('/', (req, res) => {

  res.render('password', {
    pageTitle: 'password'
  });
});

router.post('/', async (req, res) => {
  // save time in cookies
  const cookies = new Cookies(req, res, { keys: ['keyboard cat'] });
  const registerSubmitTime = cookies.get('registerSubmitTime', { signed: true });

  if (!registerSubmitTime || Date.now() - new Date(registerSubmitTime) > 60 * 1000){
    req.session.timeOut = true;
    req.session.save();
    res.redirect('/register');
    return;
  }


  try {
    const userInfo = req.session.info;
    userInfo.password = req.body.password;
    userInfo.email = userInfo.email.toLowerCase();
    const emailExist = await queryUser.emailExist(db.User, userInfo.email);

    if (emailExist) {
      req.session.emailExist = true;
      req.session.save();
      res.redirect('/register');
      return;
    }

    await db.User.create(userInfo);
    res.redirect('/');

  } catch (err) {
    console.log('\n***** There was an error: *****\n', err.message, '\n**********\n');
    res.redirect('/register');
  }

  return;
});

module.exports = router;

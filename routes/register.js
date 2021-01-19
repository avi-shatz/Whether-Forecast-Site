const express = require('express');
const router = express.Router();
const db = require('../models');
const queryUser = require('../util/queryUser');
const passwordRoutes = require('../routes/password');
const Cookies = require('cookies');

router.use('/password', passwordRoutes);

router.get('/', (req, res) => {

  res.render('register', {
    pageTitle: 'register',
    emailExist: req.session.emailExist,
    timeOut: req.session.timeOut
  });

  req.session.emailExist = false;
  req.session.timeOut = false;
  req.session.save();
});

router.post('/', async (req, res) => {

  // save time in cookies
  const cookies = new Cookies(req, res, { keys: ['keyboard cat'] });
  cookies.set('registerSubmitTime',
    new Date().toISOString(), { signed: true});

  try {
    const emailExist = await queryUser.emailExist(db.User, req.body.email);

    if (emailExist) {
      req.session.emailExist = true;
      res.redirect('/register');
    } else {
      req.session.info = req.body;
      res.redirect('/register/password');
    }
    req.session.save();
  } catch (err) {
    console.log('\n***** There was an error: *****\n', err.message, '\n**********\n');
    res.redirect('/register');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../models');
const queryUser = require('../util/queryUser');
const passwordRoutes = require('../routes/password');

router.use('/password', passwordRoutes);

router.get('/', (req, res) => {

  res.render('register', {
    pageTitle: 'register',
    emailExist: req.session.emailExist
  });

  req.session.emailExist = false;
  req.session.save();
});

router.post('/', async (req, res) => {

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

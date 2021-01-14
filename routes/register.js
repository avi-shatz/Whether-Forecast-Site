const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  res.render('register', {
    pageTitle: 'register',
    emailExist: req.session.emailExist
  });
  req.session.emailExist = false;
  req.session.save();
});

router.post('/', (req, res) => {
  const emailExist = false;

  if (emailExist) {
    req.session.emailExist = true;
    res.redirect('/register');
  }
  else {
    res.redirect('/password');
  }

  req.session.save();
});

module.exports = router;

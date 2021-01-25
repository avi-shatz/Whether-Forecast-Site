const express = require('express');
const router = express.Router();
const queryUser = require('../controllers/dbQueries');

// /login => GET
router.get('/', (req, res) => {

  res.render('login', {
    pageTitle: 'login',
    loginError: req.session.loginError,
    justRegistered: req.session.justRegistered
  });

  req.session.loginError = false;
  req.session.justRegistered = false;
  req.session.save();
});

// /login => POST
router.post('/', async (req, res) => {
  // if user with the email and password submitted, exists:
  // render the weather page with the user info

  const validAccount = await queryUser.validateAccount(req.body.email, req.body.password);

  if (validAccount) {
    req.session.userData = validAccount;
    req.session.save();
    res.redirect('/');
    return;
  }
  else {
    req.session.loginError = true;
    req.session.save();
    res.redirect('/login');
    return;
  }

});

module.exports = router;
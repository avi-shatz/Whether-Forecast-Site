const express = require('express');
const router = express.Router();
const queryUser = require('../controllers/dbQueries');
const Cookies = require('cookies');

// /register/password => GET
router.get('/', (req, res) => {

  res.render('password', {
    pageTitle: 'password'
  });
});

// /register/password => POST
router.post('/', async (req, res) => {
  // get time from cookies
  const cookies = new Cookies(req, res, { keys: ['keyboard cat'] });
  const registerSubmitTime = cookies.get('registerSubmitTime', { signed: true });

  // if the time difference between registration and password submission,
  // is greater than one minute: render the register page with a "time-out" error.
  if (!registerSubmitTime || Date.now() - new Date(registerSubmitTime) > 60 * 1000){
    req.session.timeOut = true;
    req.session.save();
    res.redirect('/register');
    return;
  }


  // if email exist: add the user do the users table and
  // render the login page with a success message.
  try {
    const userInfo = req.session.info;
    userInfo.password = req.body.password;
    userInfo.email = userInfo.email.toLowerCase();
    const emailExist = await queryUser.emailExist(userInfo.email);


    if (emailExist) {
      req.session.emailExist = true;
      req.session.save();
      res.redirect('/register');
      return;
    }

    //add user to the Users table
    await queryUser.addUser(userInfo);
    req.session.justRegistered = true;
    req.session.save();
    res.redirect('/login');
    return;

  } catch (err) {
    console.log('\n***** There was an error: *****\n', err.message, '\n**********\n');
    res.redirect('/register');
  }

  return;
});

module.exports = router;

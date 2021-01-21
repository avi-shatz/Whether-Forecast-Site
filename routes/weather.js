const path = require('path');
const express = require('express');
const router = express.Router();


// / => GET
router.get('/' , (req, res) => {

  if(req.session.userData) {
    res.render('weather', {
      pageTitle: 'weather',
      userData: req.session.userData
    });
    return;
  } else {
    res.redirect('/login');
    return;
  }

});

// / => POST
router.post('/', () => {});

// /debug-sessions => GET
router.get('/debug-sessions' , (req, res) => {
  const debug = {
    session: req.session,
    cookie: req.cookies
  }
  res.send(JSON.stringify(debug));

  res.end();
});

module.exports = router;

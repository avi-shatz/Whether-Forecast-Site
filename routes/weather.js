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

// great way to debug and see the current users cookies and sessions.
// /debug-sessions => GET
/*router.get('/debug-sessions' , (req, res) => {
  const debug = {
    session: req.session,
    cookie: req.cookies
  }
  res.send(JSON.stringify(debug));

  res.end();
});*/


module.exports = router;

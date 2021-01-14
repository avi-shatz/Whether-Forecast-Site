const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  res.render('password', {
    pageTitle: 'password'
  });
});

router.post('/', (req, res) => {
  res.send("good password");
  res.end();
});

module.exports = router;

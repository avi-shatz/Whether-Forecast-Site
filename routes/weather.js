const path = require('path');
const express = require('express');
const router = express.Router();


// /admin/add-product => GET
router.get('/' , (req, res) => {
  res.send(JSON.stringify(req.session));
/*
  res.send(JSON.stringify(req.session));
*/
  res.end();
});

// /admin/add-product => POST
router.post('/add-product', () => {});

module.exports = router;

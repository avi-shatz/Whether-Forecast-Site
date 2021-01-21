const express = require('express');
const router = express.Router();
const queryUser = require('../util/dbQueries');

// /api/get-places => GET
router.get('/get-places' , async (req, res) => {

  if(req.session.userData) {
    const places = await queryUser.getUserPlaces(req.session.userData.id);
    res.send(JSON.stringify(places));
    res.end();
    return;
  } else {
    res.redirect('/login');
    return;
  }

});

// /api/add-place => GET
router.get('/add-place' , async (req, res) => {
  const place = req.query;
  if(req.session.userData) {
    const a = await queryUser.addPlace(req.session.userData.id, place);
    /*res.send(JSON.stringify(places));
    res.end();*/
    return;
  } else {
    res.redirect('/login');
    return;
  }

});

module.exports = router;

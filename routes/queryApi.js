const express = require('express');
const router = express.Router();
const queryUser = require('../controllers/dbQueries');

// /api/get-places => GET
router.get('/get-places', async (req, res) => {

  if (req.session.userData) {
    const places = await queryUser.getUserPlaces(req.session.userData.id);
    return res.send(JSON.stringify(places));
  } else {
    return res.status(400).send(new Error("Error: user not logged in."));
  }

});

// /api/add-place => GET
router.get('/add-place', async (req, res) => {
  const place = req.query;
  if (req.session.userData) {

    try {
      await queryUser.addPlace(req.session.userData.id, place);
      return;
    } catch (e) {
      return res.status(400).send(new Error("Error: there was a data-base insert error. " + e));
    }

  } else {
    return res.status(400).send(new Error("Error: user not logged in."));
  }

});

module.exports = router;

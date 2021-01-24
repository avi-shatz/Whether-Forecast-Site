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

// /api/add-place => PUT
router.put('/add-place', async (req, res) => {

  const place = req.body;

  if (req.session.userData) {

    try {
      const addedPlace = await queryUser.addPlace(req.session.userData.id, place);
      return addedPlace;
    } catch (e) {
      return res.status(400).send(new Error("Error: there was a data-base insert error. " + e));
    }

  } else {
    return res.status(400).send(new Error("Error: user not logged in."));
  }

});

// /api/remove-place => DELETE
router.delete('/remove-place', async (req, res) => {

  const place = req.body;

  if (req.session.userData) {

    try {
      const removedPlace = await queryUser.removePlace(req.session.userData.id, place.name);
      return removedPlace;
    } catch (e) {
      return res.status(400).send(new Error("Error: there was a data-base delete error. " + e));
    }

  } else {
    return res.status(400).send(new Error("Error: user not logged in."));
  }

});


// /api/remove-all-places => DELETE
router.delete('/remove-all-places', async (req, res) => {

  if (req.session.userData) {

    try {
      const removedPlaces = await queryUser.removeAllPlaces(req.session.userData.id);
      return removedPlaces;
    } catch (e) {
      return res.status(400).send(new Error("Error: there was a data-base delete error. " + e));
    }

  } else {
    return res.status(400).send(new Error("Error: user not logged in."));
  }

});


module.exports = router;

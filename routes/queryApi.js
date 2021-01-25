const express = require('express');
const router = express.Router();
const queryUser = require('../controllers/dbQueries');

// protecting api requests by checkin the users session
router.use((req, res, next) => {

  if (req.session.userData) {
    next();
  } else {
    return res.status(400).send("Error: user not logged in.");
  }

});

// /api/get-places => GET
router.get('/get-places', async (req, res) => {
  // return a list of places that a specific user inserted.
  const places = await queryUser.getUserPlaces(req.session.userData.id);
  return res.send(JSON.stringify(places));
});

// /api/add-place => PUT
router.put('/add-place', async (req, res) => {

  const place = req.body;

  try {
    // add place to the places table.
    const addedPlace = await queryUser.addPlace(req.session.userData.id, place);
    return addedPlace;
  } catch (e) {
    return res.status(400).send(new Error("Error: there was a data-base insert error. " + e));
  }

});

// /api/remove-place => DELETE
router.delete('/remove-place', async (req, res) => {

  const place = req.body;

  try {
    // remove a place from the places table
    const removedPlace = await queryUser.removePlace(req.session.userData.id, place.name);
    return removedPlace;
  } catch (e) {
    return res.status(400).send(new Error("Error: there was a data-base delete error. " + e));
  }

});


// /api/remove-all-places => DELETE
router.delete('/remove-all-places', async (req, res) => {

  try {
    // remove all places belonging to a specific user from the places table.
    const removedPlaces = await queryUser.removeAllPlaces(req.session.userData.id);
    return removedPlaces;
  } catch (e) {
    return res.status(400).send(new Error("Error: there was a data-base delete error. " + e));
  }

});


module.exports = router;

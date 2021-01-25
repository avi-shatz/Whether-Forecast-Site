const db = require('../models');

//add user to the Users table
module.exports.addUser = async (userInfo) => {
  const table = db.User;
  return table.create(userInfo);
}

// check if email exist. returns true/false
module.exports.emailExist = async (email) => {
  const table = db.User;

  const found = await table.findOne(
    {
      attributes: ['id'],
      where: {
        email: email.toLowerCase()
      }
    });

  if (found) {
    return true
  }
  return false;
}

// check if user with the email and password params exists.
module.exports.validateAccount = async (email, password) => {
  const table = db.User;

  const found = await table.findOne(
    {
      where: {
        email: email.toLowerCase(),
        password: password
      }
    });

  return found;
}

// returns a list of places that a specific user inserted.
module.exports.getUserPlaces = async (userID) => {
  const table = db.Place;
  const found = await table.findAll(
    {
      attributes: ['name', 'lon', 'lat'],
      where: {
        userID: userID,
      }
    });

  return found;
}

// add place to the places table
module.exports.addPlace = async (userID, place) => {
  const table = db.Place;
  const found = await table.create({
    name: place.name,
    lon: place.lon,
    lat: place.lat,
    userID: userID
  });
  return found;
}

// remove a place from the places table
module.exports.removePlace = async (userID, placeName) => {
  const table = db.Place;
  const found = await table.destroy({
    where: {
      name: placeName,
      userID: userID
    }
  });
  return found;
}

// remove all places belonging to a specific user from the places table
module.exports.removeAllPlaces = async (userID) => {
  const table = db.Place;
  const found = await table.destroy({
    where: {
      userID: userID
    }
  });
  return found;
}


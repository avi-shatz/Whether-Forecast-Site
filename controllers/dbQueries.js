const db = require('../models');

module.exports.addUser = async (userInfo) => {
  const table = db.User;
  return table.create(userInfo);
}

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


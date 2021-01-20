
module.exports.emailExist = async (table, email) => {
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

module.exports.validateAccount = async (table, email, password) => {
  const found = await table.findOne(
    {
      where: {
        email: email.toLowerCase(),
        password: password
      }
    });

  return found;
}



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


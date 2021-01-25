const express = require('express');
const router = express.Router();

// /logout => DELETE
router.delete('' , (req, res) => {
  req.session.destroy();
  res.end();
});

module.exports = router;
const path = require('path');

const express = require('express');

const productsController = require('../controllers/users');

const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;

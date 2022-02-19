const express = require('express');
const router = express.Router();
const path = require('path');
const webControllers = require('../controllers/webControllers.js');

router.get('/', webControllers.index);
router.get('/carrito', webControllers.carrito);
router.get('/products', webControllers.products);
router.get('/login', webControllers.login);

module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');
const webControllers = require('../controllers/webControllers.js');
const admin = require('../controllers/adminControllers.js');

router.get('/', webControllers.index);
router.get('/carrito', webControllers.carrito);
router.get('/products', webControllers.products);
router.get('/login', webControllers.login);


/*-- Routes Admin Products--*/
router.get('/listProducts', admin.listProducts);
//router.post('/ProductCreate', admin.productCreate);
module.exports = router;
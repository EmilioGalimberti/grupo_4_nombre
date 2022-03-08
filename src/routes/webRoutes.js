const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const webControllers = require('../controllers/webControllers.js');


router.get('/', webControllers.index);
router.get('/carrito', webControllers.carrito);
router.get('/login', webControllers.login);



module.exports = router;
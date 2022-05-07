const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const webControllers = require('../controllers/webControllers.js');
const usersControllers = require('../controllers/usersControllers.js');
const userMidd = require("../middleware/userMiddleware.js");
const session = require('express-session');


router.get('/', webControllers.index);
router.get('/carrito', webControllers.carrito);
router.get('/detail', webControllers.detail);


router.get('/login', userMidd.acces,webControllers.login);
router.post('/', userMidd.logueo, usersControllers.acceso)

module.exports = router;
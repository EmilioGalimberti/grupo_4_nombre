const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const webControllers = require('../controllers/webControllers.js');
const usersControllers = require('../controllers/usersControllers.js');
const userMidd = require("../middleware/userMiddleware.js");

router.get('/', webControllers.index);
router.get('/carrito', webControllers.carrito);
router.get('/detail', webControllers.detail);
router.get('/login', webControllers.login);


const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, path.join(__dirname, "../../public/images/usersData"))
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
});
const uploadFile = multer({storage});

router.get('/register',usersControllers.register);
router.post('/register', uploadFile.single("image"),usersControllers.userCreate);


router.post('/', userMidd, usersControllers.acceso)

module.exports = router;
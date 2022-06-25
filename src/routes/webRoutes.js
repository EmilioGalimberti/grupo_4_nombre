const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const webControllers = require('../controllers/webControllers.js');
const usersControllers = require('../controllers/usersControllers.js');
const userMidd = require("../middleware/userMiddleware.js");
const session = require('express-session');
const {validationResult, body} = require('express-validator');

router.get('/', webControllers.index);
router.get('/carrito', webControllers.carrito);
router.get('/detail', webControllers.detail);



const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, path.join(__dirname, "../../public/images/usersData"))
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
});
const uploadFile = multer({storage});
router.get('/register', userMidd.acces, usersControllers.register);
router.post('/register', uploadFile.single("image"),
            /*userMidd.userValidation(), userMidd.validate,*/ usersControllers.userCreate);



router.get('/login', userMidd.acces, webControllers.login);
router.post('/', usersControllers.logueo);

 
router.get('/edit/:id', userMidd.acces, usersControllers.editUser); 
router.post('/update', uploadFile.single("image"),usersControllers.update);


module.exports = router;
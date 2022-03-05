const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const webControllers = require('../controllers/webControllers.js');
const admin = require('../controllers/adminControllers.js');

router.get('/', webControllers.index);
router.get('/carrito', webControllers.carrito);
router.get('/products', webControllers.products);
router.get('/login', webControllers.login);


/*-- Routes Admin Products--*/
const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, path.join(__dirname, "../../public/images/productsData"))
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
});
const uploadFile = multer({storage});

router.get('/listProducts', admin.listProducts);
router.post('/ProductCreate', uploadFile.single("image"),admin.productCreate); 




module.exports = router;
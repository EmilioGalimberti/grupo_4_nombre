const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const products = require('../controllers/productsControllers.js');



const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, path.join(__dirname, "../../public/images/productsData"))
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
});
const uploadFile = multer({storage});
// get all products
router.get('/', products.listProducts);

// create one product
router.get('/create', products.formProduct);
router.post('/', uploadFile.single("image"),products.productCreate); 



module.exports = router;
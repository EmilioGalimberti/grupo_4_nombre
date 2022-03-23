const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productsControllers = require('../controllers/productsControllers.js');



const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, path.join(__dirname, "../../public/images/productsControllersData"))
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
});
const uploadFile = multer({storage});
// get all productsControllers
router.get('/', productsControllers.listProducts);

// create one product
router.get('/create', productsControllers.formProduct);
router.post('/', uploadFile.single("image"),productsControllers.productCreate); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsControllers.edit); 
router.post('/edit/:id', productsControllers.update); 

// delete one product
router.delete('/delete/:id', productsControllers.destroy); 

module.exports = router;
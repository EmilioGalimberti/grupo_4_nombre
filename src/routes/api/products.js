const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const productsApiController = require('../../controllers/api/productsApiController');

router.get('/', productsApiController.list);

// router.get('/movies/new', moviesController.new);
// router.get('/movies/recommended', moviesController.recomended);
//----router.get('/detail/:id', moviesAPIController.detail);
// //Rutas exigidas para la creación del CRUD
// router.get('/movies/add', moviesController.add);
// router.post('/movies/create', moviesController.create);
// router.get('/movies/edit/:id', moviesController.edit);
// router.put('/movies/update/:id', moviesController.update);
// router.get('/movies/delete/:id', moviesController.delete);
// router.delete('/movies/delete/:id', moviesController.destroy);

module.exports = router;
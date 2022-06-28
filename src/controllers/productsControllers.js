const fs = require('fs');
const path = require('path');
const session = require('express-session');

const db = require('../database/models');
const sequelize = db.sequelize;

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP",]

const productsControllers = {
    // show all products
    listProducts:(req, res) =>{
		let email = session.email;
        console.log(email)
        db.Product.findAll()
            .then(products => {
                res.render('adminProducts/listProducts', {products, toThousand, titulos, "numero": 5, email})
            })
    },

    // show one product
    getProduct:(req, res) =>{
		let email = session.email;
        let id = req.params.id
        db.Product.findByPk(id)
            .then(product => {
                res.render('adminProducts/productDetail', {product,toThousand,email})
            })
    },

    //Form create
    formProduct:(req, res) =>{
        let email = session.email;
        res.render('adminProducts/productsForms',{titulos, "numero":4, email});
    },

    // Create Product and storage method
    productCreate: (req, res) => {

            db.Product.create({ 
                name: req.body.name,
                price:req.body.price,
                discount:req.body.discount,
                color: req.body.color,
                description:req.body.description,
                image: "/images/productsData/"+req.file.filename,
                brand: req.body.brand,
                size: req.body.size,
                category: req.body.category
            });
            res.redirect('/products');
        },
    
    //form edit
    edit: (req, res) => {
        let email = session.email;
		let id = req.params.id
        db.Product.findByPk(id)
            .then(productToEdit => {
                res.render('adminProducts/product-edit-form', {productToEdit, email})
            })
		//let productToEdit = products.find(product => product.id == id)
		//res.render('adminProducts/product-edit-form', {productToEdit})
	},
    
    // Update - Method to update
	update: (req, res) => {
        
		let id = req.body.prodId;
		//let productToEdit = db.Product.findByPk(id)
        
        db.Product.update({ 
            name: req.body.name,
            price:req.body.price,
            discount:req.body.discount,
            color: req.body.color,
            description:req.body.description,
            brand: req.body.brand,
            size: req.body.size,
            category: req.body.category
        },
        {where: {id: id}}
        );
        res.redirect('/products');
    },
        
    // delte one product form database
    destroy : (req, res) => {
		let id = req.params.id;
        db.Product.destroy({where:{id: id}})
		res.redirect('/products');
	}
};

module.exports = productsControllers;
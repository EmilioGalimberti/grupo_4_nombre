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
        db.Product.findAll()
            .then(products => {
                res.render('adminProducts/listProducts', {products, toThousand, titulos, "numero": 5, email})
            })
    },

    //Form create
    formProduct:(req, res) =>{
        res.render('adminProducts/productsForms',{titulos, "numero":4});
    },

    // Create Product and storage method
    productCreate: (req, res) => {

            /*
            let newProduct = {
                id: products[products.length - 1].id + 1,
                ...req.body,
                image: "/images/productsData/"+req.file.filename
            };
            products.push(newProduct);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));*/

            db.Product.create({ 
                name: req.body.name,
                price:req.body.price,
                discount:req.body.discount,
                color: req.body.color,
                description:req.body.description,
                image: req.body.image,
                brand: req.body.brand,
                size: req.body.size,
                category: req.body.category
            });
            res.redirect('/products');

            /*
                let newProduct = {
                id: products[products.length - 1].id + 1,
                ...req.body,
                image: "/images/productsData/default-image.png"
            };
            products.push(newProduct);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
            res.redirect('/products');
            */ 
        },
    
    //form edit
    edit: (req, res) => {
		let id = req.params.id
        db.Product.findByPk(id)
            .then(productToEdit => {
                res.render('adminProducts/product-edit-form', {productToEdit})
            })
		//let productToEdit = products.find(product => product.id == id)
		//res.render('adminProducts/product-edit-form', {productToEdit})
	},
    
    // Update - Method to update
	update: (req, res) => {
        
		let id = req.body.prodId;
		let productToEdit = products.find(product => product.id == id)
        
        
		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: productToEdit.image,
		};


		
		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.render('adminProducts/listProducts', {products, toThousand, titulos, "numero": 5});
	},

    // delte one product form database
    destroy : (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/products');
	}
};


module.exports = productsControllers;
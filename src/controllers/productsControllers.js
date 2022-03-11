const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP"]

const productsControllers = {
    listProducts:(req, res) =>{
        res.render('adminProducts/listProducts', {
            products
        });
    },

    formProduct:(req, res) =>{
        res.render('adminProducts/productsForms',{
            titulos, "numero":4
        });
    },
    // Create Product and storage method
    productCreate: (req, res) => {

       if(req.file.filename){
            let newProduct = {
                id: products[products.length - 1].id + 1,
                ...req.body,
                image: "/images/productsData/"+req.file.filename
            };
            products.push(newProduct);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
            res.redirect('/products');
        }
        else{
            let newProduct = {
                id: products[products.length - 1].id + 1,
                ...req.body,
                image: "/images/productsData/default-image.png"
            };
            products.push(newProduct);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
            res.redirect('/products');   
        }
        
    }
};


module.exports = productsControllers;
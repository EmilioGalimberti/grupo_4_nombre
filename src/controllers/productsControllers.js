const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productsControllers = {
    listProducts:(req, res) =>{
        res.render('adminProducts/listProducts', {
            products
        });
    },

    formProduct:(req, res) =>{
        res.render('adminProducts/productsForms');
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
            res.redirect('back');
        }
        else{
            let newProduct = {
                id: products[products.length - 1].id + 1,
                ...req.body,
                image: "/images/productsData/default-image.png"
            };
            products.push(newProduct);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
            res.redirect('back');   
        }
        
    }
};


module.exports = productsControllers;
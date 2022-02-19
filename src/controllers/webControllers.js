const path = require('path');

let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP"]

module.exports = {
    index: (req,res) =>{
        res.render(path.resolve(__dirname, '../views/web/index'),{titulos, "numero":1});
    },
    carrito: (req,res) =>{
        res.render(path.resolve(__dirname, '../views/products/productCart'),{titulos, "numero":0});
    },
    products:(req,res) =>{
        res.render(path.resolve(__dirname, '../views/products/productDetail'),{titulos, "numero":2});
    },
    login:(req,res) =>{
        res.render(path.resolve(__dirname, '../views/users/login'));
    }
}
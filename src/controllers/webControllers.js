const path = require('path');
const session = require('express-session');
let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP", "login"];

module.exports = {
    index: (req,res) =>{
        res.render(path.resolve(__dirname, '../views/web/index'),{titulos, "numero":1});
    },
    carrito: (req,res) =>{
        let email = session.email;
        res.render(path.resolve(__dirname, '../views/products/productCart'),{titulos, "numero":0, email});
    },
    detail:(req,res) =>{
        res.render(path.resolve(__dirname, '../views/products/productDetail'));
    },
    products:(req,res) =>{
        res.render(path.resolve(__dirname, '../views/products/products'),{titulos, "numero":2});
    },
    login:(req,res) =>{
        res.render(path.resolve(__dirname, '../views/users/login'),{titulos, "numero":4});
    },
    register:(req,res) =>{
        res.render(path.resolve(__dirname, '../views/users/register'),{titulos, "numero":4});
    }

}
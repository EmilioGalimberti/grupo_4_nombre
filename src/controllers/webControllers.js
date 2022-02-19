const path = require('path');

module.exports = {
    index: (req,res) =>{
        res.render(path.resolve(__dirname, '../views/web/index'));
    },
    compra: (req,res) =>{
        res.render(path.resolve(__dirname, '../views/products/productCart'));
    },
    products:(req,res) =>{
        res.render(path.resolve(__dirname, '../views/products/productDetail'));
    },
    login:(req,res) =>{
        res.render(path.resolve(__dirname, '../views/users/login'));
    }
}
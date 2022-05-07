const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const session = require('express-session');


let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP", "login"];
const productsMiddleware = {
	acces: (req, res, next)=>{

		const email = session.email;
		if(typeof email !== 'undefined'){
			next();
		}
		else{
			res.redirect('/');
		}
	}
}

module.exports = productsMiddleware;
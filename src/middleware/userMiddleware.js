const fs = require('fs');
const path = require('path');
const {validationResult, body} = require('express-validator');
const session = require('express-session');
const db = require('../database/models');





let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP", "login"];
const usersMiddleware = {		
	acces: (req, res, next)=>{
		if(!session.email){
			next();
		}
		else{
				res.render(path.resolve(__dirname, '../views/web/index'),{titulos, "numero":1, "email": session.email});
		}
	},
	userValidation: () => {
			
		  	return [
		    body('first_Name').isLength({ min: 5 }).withMessage("El nombre de tener al menos 5 caracteres"),
		    body('email').isEmail().withMessage("El email es obligatorio"),
		    body('email').custom(async (mail) => {
			            	  const existingUser = await db.User.findOne({ where: { email: mail } });
			                  if (existingUser) {
			                	   throw new Error('El correo electronico ya esta en uso');
			            	  }
			              }),
		 
		    body('password').isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 digitos."),
		    body('password').matches(/[a-z]/).withMessage('La contraseña debe tener al menos una minuscula.'),
		    body('password').matches(/\d/).withMessage('La contraseña debe tener al menos un numero.'),
		    body('password').matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una mayuscula.')
		  ]
		 
	},
	validate: (req, res, next) => {

	  
	  const errors = validationResult(req);
	  
	  if (typeof req.file != 'undefined'){
	  	  let arr = new Array();
	  	  arr.push(req.file.filename.indexOf(["png"]));
	  	  arr.push(req.file.filename.indexOf(["jpeg"]));
	  	  arr.push(req.file.filename.indexOf(["jpg"]));	
	  	  let contador = 0;
	  	  for (var i = 0; i < arr.length ; i++) {
	  	  	if(arr[i] > 0){
	  	  		contador = 1;
	  	  	}
	  	  }
	  	  
		  if(contador == 0){
		  	errors.file = {value: req.file.filename, msg: "debe agregar una imagen valida de extension JPG, JPEG, PNG, GIF"};
		  }
		  
	  }
	  else{
	  	errors.file = {msg: "debe agregar una imagen"};
	  }
	  
	  if(errors.isEmpty() && typeof errors.file == 'undefined') {
	    return next()
	  }
	
	  return res.render('users/register',{titulos, "numero":4, errores: errors});
	}
}

module.exports = usersMiddleware;
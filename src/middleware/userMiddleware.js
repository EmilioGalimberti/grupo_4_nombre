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
			//console.log(body('image').notEmpty().isLength({ min: 2 }));
		  	return [
		    body('first_Name').isLength({ min: 5 }).withMessage("El nombre es obligatorio"),
		    body('email').isEmail().withMessage("El email es obligatorio"),
		    body('email').custom(async (mail) => {
			            	  const existingUser = await db.User.findOne({ where: { email: mail } });
			                  if (existingUser) {
			                	   throw new Error('El correo electronico ya esta en uso');
			            	  }
			              }),
		 
		    body('password').isLength({ min: 8 }).withMessage("La contraseña es obligatoria"),
		    body('password').matches(/\d/).matches(/[A-Z]/).matches(/[a-z]/).withMessage('debe agregar una contraseña correcta, debe tener al menos una mayuscula, una minuscula y uno o mas numeros')
		  ]
		 
	},
	validate: (req, res, next) => {

	  
	  const errors = validationResult(req);
	  if (typeof req.file.filename != 'undefined'){
		  if(req.file.filename.indexOf(["png"]) == -1 ||
		  	 req.file.filename.indexOf(["jpeg"]) == -1 ||
		  	 req.file.filename.indexOf(["jpg"]) == -1 ||
		  	 req.file.filename.indexOf(["gif"]) == -1){
		  	errors.file = {value: req.file.filename, msg: "debe agregar una imagen valida de extension JPG, JPEG, PNG, GIF"};
		  }
	  }
	  else{
	  	errors.file = {msg: "debe agregar una imagen"};
	  }
	  if (errors.isEmpty()) {
	    return next()
	  }
	  const extractedErrors = []
	  errors.array().map(err => extractedErrors.push({ "value": err.msg }))
	  console.log(extractedErrors)
	  return res.render('users/register',{titulos, "numero":4, errors: extractedErrors});
	}
}

module.exports = usersMiddleware;
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const session = require('express-session');

const usersFilePath = path.join(__dirname, '../data/userDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP", "login"];
const usersMiddleware = {
		
	logueo:(req, res, next)=>{
		const user = users.find(element => element.email == req.body.email && element.password == req.body.pass);

		//let errors = validationResult(req);
		if(!user){
			const err = "no tiene acceso";
			//res.status('../views/users/login').json({ err });
			//res.status(404).json({ err });
			return res.render('./users/login', {err});
			//next(res.redirect('back'));
		}
		next();
	},

	acces: (req, res, next)=>{
		if(!session.email){
			next();
		}
		else{
				res.render(path.resolve(__dirname, '../views/web/index'),{titulos, "numero":1, "email": session.email});
		}
	}
}

module.exports = usersMiddleware;
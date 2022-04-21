const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/userDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const usersMiddleware = (req, res, next)=>{
		
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
}

module.exports = usersMiddleware;
const fs = require('fs');
const path = require('path');

const session = require('express-session');

const usersFilePath = path.join(__dirname, '../data/userDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP", "login"]

const usersControllers = {
		acceso: (req, res)=>{
				session.email = req.body.email;
				let email = session.email;
				res.render(path.resolve(__dirname, '../views/web/index'),{titulos, "numero":1, email});
		}
}

module.exports = usersControllers;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const session = require('express-session');

const db = require('../database/models');
const sequelize = db.sequelize;

const usersFilePath = path.join(__dirname, '../data/userDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP", "login"]

const usersControllers = {
		acceso: (req, res)=>{
				session.email = req.body.email;
				let email = session.email;
				res.render(path.resolve(__dirname, '../views/web/index'),{titulos, "numero":1, email});
		},
		register:(req, res) =>{
			res.render('users/register',{titulos, "numero":4});
		},
		userCreate: (req, res) => {
			if(req.file.filename){
				const hash = bcrypt.hashSync(req.body.password, 8);
				/*let newUser = {
					id: users[users.length - 1].id + 1,
					firstName: req.body.firstName,
                 	lastName:req.body.lastName,
                 	email:req.body.email,
                 	password: hash,
					image: "/images/usersData/"+req.file.filename
				};
				users.push(newUser);
				fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));*/

				db.User.create({ 
					first_Name: req.body.firstName,
                 	last_Name:req.body.lastName,
                 	email:req.body.email,
                 	password: hash,
					category: 1,  // usuario comun: 1
					image: "/images/usersData/"+req.file.filename
				});
				res.redirect('/');
			}
			else{
				let newUser = {
					id: users[users.length - 1].id + 1,
					...req.body,
					image: "/images/usersData/default-image.png"
				};
				users.push(newUser);
				fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
				res.redirect('/users');   
			}  
		}
		
}

module.exports = usersControllers;
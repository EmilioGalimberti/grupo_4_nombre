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
			res.render('users/register',{users,toThousand,titulos, "numero":4});
		},
		userCreate: (req, res) => {
			if(req.file.filename){
				const hash = bcrypt.hashSync(req.body.password, 8);  //bcrypt.compareSync
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
				res.send(req.body.first_Name);
				db.User.create({ 
					first_Name: "gaston",
                 	last_Name:req.body.email,
                 	email:req.body.email,
                 	password: hash,
					category: 1,  // usuario comun: 1
					image: "/images/usersData/"+req.file.filename
				});
				console.log(user.username);
				res.redirect('/');
			}
			/*else{
				let newUser = {
					id: users[users.length - 1].id + 1,
					...req.body,
					image: "/images/usersData/default-image.png"
				};
				users.push(newUser);
				fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
				db.User.create({ 
					first_Name: req.body.first_Name,
                 	last_Name:req.body.last_Name,
                 	email:req.body.email,
                 	password: hash,
					category: 1,  // usuario comun: 1
					image: "/images/usersData/default-image.png"
				});
				res.redirect('/users');   
			}  */
		},
		//form edit users
		editUser:(req,res)=>{
			let id=req.params.id
			db.User.findByPk(id)
            .then(userToEdit => {

                res.render('users/user-edit-form', {userToEdit})
            })
		},
		// Update - Method to update
	update: (req, res) => {
        
		let id = req.body.userId;
		let userToEdit = users.find(user => user.id == id)
        
        
		userToEdit = {
			id: userToEdit.id,
			...req.body,
			image: userToEdit.image,
		};

		let newUsers = users.map(user => {
			if (user.id == userToEdit.id) {
				return user = {...userToEdit};
			}
			return user;
		})

		fs.writeFileSync(usersFilePath, JSON.stringify(newUsers, null, ' '));
	},
	destroy : (req, res) => {
		let id = req.params.id;
        db.Product.destroy({where:{id: id}})
		res.redirect('/');
	}
}

module.exports = usersControllers;
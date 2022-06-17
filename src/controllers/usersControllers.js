const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const session = require('express-session');

const db = require('../database/models');
const sequelize = db.sequelize;


let titulos = ['CARRITO', "HOME", "PRODUCTS","SING UP", "login"]

const usersControllers = {

		logueo: (req, res, next)=>{
			//const user = users.find(element => element.email == req.body.email 
			//	&& element.password == req.body.pass);
			db.User.findOne({ where: { email: req.body.email} }).then((usuario) =>{
				let usuarioLogueo = usuario; 
				if(usuarioLogueo){
					let pass = bcrypt.compareSync(req.body.pass,usuarioLogueo.password);
					if(!pass){
						const err = "no tiene acceso";
						console.log("llego a pass: " + err);
						return res.render('./users/login', {err});
					}
					session.email = usuarioLogueo.email;
					let email = session.email;
					res.render(path.resolve(__dirname, '../views/web/index'),{titulos, "numero":1, email});
					}
				else{
					    const err = "no tiene acceso";
						return res.render('./users/login', {err});
					}		
			});
			
		},
		register:(req, res) =>{
			res.render('users/register',{users,toThousand,titulos, "numero":4});
		},
		userCreate: (req, res) => {

			const hash = bcrypt.hashSync(req.body.password, 8);
			if(req.file){
	
				db.User.create({ 
					first_name: req.body.first_Name,
                 	last_name:req.body.lastName,
                 	email:req.body.email,
                 	password: hash,
					category: 1,  // usuario comun: 1
					image: "/images/usersData/"+req.file.filename
				});
				res.redirect('/');
			}
			else{
				db.User.create({ 
					first_name: req.body.first_Name,
                 	last_name: req.body.last_Name,
                 	email:req.body.email,
                 	password: hash,
					category: 1,   // usuario comun: 1
					image: "/images/usersData/avatar.png"
				});
				res.redirect('/');   
			}  
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
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
					console.log('req.body',req.body)
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
		update: function (req, res) {
			console.log('req',req.body);
			db.User.update({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: req.body.password,
				category: req.body.category,
				image: req.file ? "/images/usersData/"+req.file.filename : "/images/usersData/avatar.png"
			}, {
				where: {
					id: req.body.userId
				}
			});
			console.log(db.User.findByPk(req.body.userId));
			res.redirect(`/`)
		},

		destroy: (req, res) => {
			console.log(req);
			db.User
				.findByPk(id)
				// Si el registro existe
				.then(async user => {
					// Lo borramos
					await db.User.destroy({ where: { id:req.body.userId} });
					
					// y además borramos la imagen asociada
					const imagePath = path.resolve(__dirname, '../../public/images/usersData', user.image);
					if (fs.existsSync(imagePath)) {
						fs.unlinkSync(imagePath);
					}
	
					// luego volvemos al listado
					res.redirect(`/`)
				})
				.catch(error => console.log(error));
		}

	/*destroy: (req, res) => {
        db.User
            .findByPk(req.params.id)
            // Si el registro existe
            .then(async user => {
                // Lo borramos
                await db.User.destroy({ where: { id: req.params.id } });
                
                // y además borramos la imagen asociada
                const imagePath = path.resolve(__dirname, '../../public/images/usersData', user.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }

                // luego volvemos al listado
                res.redirect(`/`)
            })
            .catch(error => console.log(error));
    }

*/
}

module.exports = usersControllers;

/* update: (req, res) => {

        product = req.body;
        
        product.image = req.params.image ? req.body.image : req.body.oldImage;
        delete product.oldImage;

        // product.keywords = product.keywords.split(' ');
        
        db.product
            .update(product, {
                where: {
                    id: req.params.id

                }
            })
            .then(updatedProduct => {
                // Guardar tags
                // updatedProduct.addTags()
                res.redirect(`/products/${req.params.id}`)
            })
            .catch(error => { console.log(error) })
        
    },
*/

/*destroy: (req, res) => {
        db.product
            .findByPk(req.params.id)
            // Si el registro existe
            .then(async product => {
                // Lo borramos
                await db.product.destroy({ where: { id: req.params.id } });
                
                // y además borramos la imagen asociada
                const imagePath = path.resolve(__dirname, '../../public/images/products', product.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }

                // luego volvemos al listado
                res.redirect(`/products/`)
            })
            .catch(error => console.log(error));
    }

*/
const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
//const moment = require('moment');



const Movies = db.Product;



const productApiController = {
    'list': async (req, res) => {
      let prod = new Array(); 
      prod = await db.Product.findAll({
							      attributes: [ 'id', 'name', 'description', 'category'],
							      detail: "detalle"
							      });
							      
      console.log(prod)
      /*then((pd)=>{
							      	console.log(pd.Product);
							      	pd.forEach((prr)=>{
							      		console.log("description "+ pd.description);
							      		prod.push({"name": prr.name, "detail": "bla bla"+ prr.id});
							      		//console.log(prod);
							      	})
							      	console.log("producto dentro de then " + prod);
							      });
      							console.log("producto despues de foreach " + prod);*/
    	let respuesta = 
                   { 
                  count: await db.Product.count({
									  col: 'Product.id'
									}),
                  countByCategory: {cantidad: await db.Product.count({
																						  distinct: true,
																						  col: 'Product.category'
																						  }),
                  									"nombres categorias":await db.Product.findAll({
																	      attributes: ['category']
																	      })
                									 },        
  				        products: await db.Product.findAll({
							      attributes: [ 'id', 'name', 'description', 'category']
							      })  
             }

		res.json(respuesta);
}
    
}


module.exports = productApiController;
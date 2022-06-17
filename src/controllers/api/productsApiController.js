const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
//const moment = require('moment');



const Movies = db.Product;



const productApiController = {
    'list': async (req, res) => {
        
    	let respuesta = {
                    
                  count: await db.Product.count({
									  col: 'Product.id'
									}),
                  countByCategory: await db.Product.count({
									  distinct: true,
									  col: 'Product.category'
									}),        
  				  products: await db.Product.findAll({
							      attributes: ['name', 'description', 'category']
							      })   
             }

		res.json(respuesta);
}
    
}


module.exports = productApiController;
const db = require('../../database/models')
const sequelize = db.sequelize;

module.exports={
    list: (req, res) => {
        db.User
        .findAll({attributes: ['id','first_name','email']})
        .then(users => {
            
            res.json({
                total: users.length,
                data: users,
                
            })
        })
    },

    show: (req, res) => {
        db.User
        .findByPk(req.params.id,{
            attributes: ['id','first_name','last_name','email','image']
        })
        .then(user => {
            return res.status(200).json({
                data: user,
                status: 200
            })
        })
    }    
}
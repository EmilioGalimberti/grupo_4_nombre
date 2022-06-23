const db = require('../../database/models')
const sequelize = db.sequelize;

module.exports={
    list: (req, res) => {
        db.User
        .findAll({attributes: ['id','first_name','email']})
        .then(users => {
            users.detail = 'http://localhost:3050/api/users/:id'
            return res.status(200).json({
                total: users.length,
                data: users,
                status: 200
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
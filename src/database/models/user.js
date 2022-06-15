module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        "first_name": {
            type: dataTypes.STRING,
            allowNull: false
        },
        "last_name": {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config)

    User.associate = function(models){
        User.belongsToMany(models.Product, {
            as:"product",
            through: "users_products",
            foreignKey: "id_user",
            otherKey: "id_product",
            timestamps: false
        });
    }
    return User
}
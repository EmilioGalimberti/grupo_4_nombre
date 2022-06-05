module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.INTEGER
        },
        category: {
            type: dataTypes.STRING
        },
        color: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        },
        brand: {
            type: dataTypes.STRING
        },
        size: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)

    Product.associate = function(models){
        Product.associate = function(models){
            Product.belongsToMany(models.User, {
                as:"user",
                through: "users_products",
                foreignKey: "id_product",
                otherKey: "id_user",
                timestamps: false
            });
        }
    }
    return Product
}
module.exports = (sequelize, dataTypes) => {
    let alias = 'UserProduct';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: dataTypes.INTEGER
        },
        id_user: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'users_products',
        timestamps: false
    };
    const UserProduct = sequelize.define(alias, cols, config)

    /*Product.associate = function(models){
        Product.hasOne(models.ProductDetail, {
            as:"products_detail",
            foreignKey: "id_product_detail"
        });
    }*/
    return UserProduct
}
module.exports = (sequelize, dataTypes) => {
    let alias = 'ShoppingCart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user_product: {
            type: dataTypes.INTEGER
        },
        id_cart_detail: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        final_price: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'shopping_cart',
        timestamps: false
    };
    const ShoppingCart = sequelize.define(alias, cols, config)

    /*Product.associate = function(models){
        Product.hasOne(models.ProductDetail, {
            as:"products_detail",
            foreignKey: "id_product_detail"
        });
    }*/
    return ShoppingCart
}
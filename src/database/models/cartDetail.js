module.exports = (sequelize, dataTypes) => {
    let alias = 'CartDetail';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_order: {
            type: dataTypes.DATE
        },
        payment_method: {
            type: dataTypes.VARCHAR
        }
    };
    let config = {
        tableName: 'cart_detail',
        timestamps: false
    };
    const CartDetail = sequelize.define(alias, cols, config)

    /*Product.associate = function(models){
        Product.hasOne(models.ProductDetail, {
            as:"products_detail",
            foreignKey: "id_product_detail"
        });
    }*/
    return CartDetail
}
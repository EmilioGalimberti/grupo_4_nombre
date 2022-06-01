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
        id_product_detail: {
            type: dataTypes.INTEGER
        },
        category: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)

    Product.associate = function(models){
        Product.hasOne(models.ProductDetail, {
            as:"products_detail",
            foreignKey: "id_product_detail"
        });
    }
    return Product
}
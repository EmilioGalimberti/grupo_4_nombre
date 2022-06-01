module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductDetail';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        tableName: 'products_detail',
        timestamps: false
    };
    const ProductDetail = sequelize.define(alias, cols, config)

    return ProductDetail
}
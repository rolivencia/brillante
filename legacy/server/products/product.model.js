import { Manufacturer } from '../../src/app/_models/product';

const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

class Product extends Sequelize.Model {}
class ProductAssignedCategories extends Sequelize.Model {}
class ProductCategory extends Sequelize.Model {}
class ProductManufacturer extends Sequelize.Model {}
class ProductStock extends Sequelize.Model {}

Product.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name',
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'price',
        },
        imageUrls: {
            type: Sequelize.JSON,
            allowNull: true,
            field: 'image_urls',
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            field: 'description',
        },
        idManufacturer: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            field: 'id_manufacturer',
            references: {
                model: 'sh_store_manufacturers',
                key: 'id',
            },
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_store_products',
    }
);

ProductCategory.init(
    {
        id: {
            type: Sequelize.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'description',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_store_manufacturers',
    }
);

ProductAssignedCategories.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'id_product',
            references: { model: 'sh_store_product' },
        },
    },
    {}
);

ProductManufacturer.init(
    {
        id: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'description',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_store_categories',
    }
);

ProductStock.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        idProduct: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'id_product',
            references: {
                model: 'sh_store_products',
                key: 'id',
            },
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'quantity',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_store_product_stock',
    }
);

ProductAssignedCategories.belongsTo(Product, { as: 'product', foreignKey: 'id_product' });
ProductAssignedCategories.belongsTo(ProductCategory, { as: 'category', foreignKey: 'id_category' });

Product.hasMany(ProductAssignedCategories, { as: 'productCategories', foreignKey: 'id_product' });
ProductCategory.hasMany(ProductAssignedCategories, { as: 'categoriesProduct', foreignKey: 'id_category' });

Product.belongsTo(Manufacturer, { as: 'manufacturer', foreignKey: 'id_manufacturer' });
Manufacturer.hasOne(Product, { as: 'product', foreignKey: 'id_manufacturer' });

Product.belongsTo(ProductStock, { as: 'stock', foreignKey: 'id_product' });
ProductStock.hasOne(Product, { as: 'product', foreignKey: 'id_product' });

module.exports = { Product, ProductAssignedCategories, ProductCategory, ProductManufacturer, ProductStock };

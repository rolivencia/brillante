'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('sh_tab_payment_methods', 'enabled', {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
        });
        await queryInterface.addColumn('sh_tab_payment_methods', 'deleted', {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('sh_tab_payment_methods', 'enabled');
        await queryInterface.removeColumn('sh_tab_payment_methods', 'deleted');
    },
};

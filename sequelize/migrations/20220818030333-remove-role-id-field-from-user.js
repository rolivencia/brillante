'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('user', 'role_id');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('user', 'role_id', { type: Sequelize.DataTypes.INTEGER });
    },
};

'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.bulkUpdate(
                'sh_tab_payment_methods',
                { enabled: false },
                { payment_method_id: { [Op.in]: [3, 7, 8] } }
            );
            transaction.commit();
        } catch (err) {
            await this.down(queryInterface, Sequelize);
            transaction.rollback();
            throw err;
        }
    },

    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.bulkUpdate(
                'sh_tab_payment_methods',
                { enabled: true },
                { payment_method_id: { [Op.in]: [3, 7, 8] } },
                { transaction }
            );
            transaction.commit();
        } catch (err) {
            transaction.rollback();
            throw err;
        }
    },
};

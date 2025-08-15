'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.bulkInsert(
                'sh_tab_payment_methods',
                [
                    {
                        payment_method_id: 12,
                        description: 'Galicia 33',
                        allows_installments: false,
                    },
                    {
                        payment_method_id: 13,

                        description: 'Galicia Cosundino',
                        allows_installments: false,
                    },
                ],
                { transaction }
            );
            await queryInterface.bulkInsert(
                'sh_tab_payment_method_installments',
                [
                    {
                        id: 24,
                        id_payment_method: 12,
                        installments: 1,
                        interest_rate: 0.0,
                    },
                    {
                        id: 25,
                        id_payment_method: 13,
                        installments: 1,
                        interest_rate: 0.0,
                    },
                ],
                { transaction }
            );

            transaction.commit();
        } catch (err) {
            await this.down(queryInterface, Sequelize);
            transaction.rollback();
            throw err;
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            'sh_tab_payment_method_installments',
            { id_payment_method: { [Op.in]: [12, 13] } },
            {}
        );
        await queryInterface.bulkDelete('sh_tab_payment_methods', { payment_method_id: { [Op.in]: [12, 13] } }, {});
    },
};

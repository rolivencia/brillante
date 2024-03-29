'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.addColumn(
                'user',
                'has_finished_registration',
                { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
                { transaction }
            );
            await queryInterface.addColumn(
                'sh_fix_customer',
                'id_user',
                { type: Sequelize.DataTypes.INTEGER.UNSIGNED },
                { transaction }
            );
            await queryInterface.addConstraint(
                'sh_fix_customer',
                {
                    type: 'FOREIGN KEY',
                    name: 'fk_customer_user',
                    fields: ['id_user'],
                    references: {
                        table: 'user',
                        field: 'id',
                    },
                    onDelete: 'set null',
                    onUpdate: 'cascade',
                },
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
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn('user', 'has_finished_registration', { transaction });
            await queryInterface.removeColumn('sh_fix_customer', 'id_user', { transaction });
        } catch (err) {
            transaction.rollback();
            throw err;
        }
    },
};

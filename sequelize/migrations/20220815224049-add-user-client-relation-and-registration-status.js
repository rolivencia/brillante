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
                { type: Sequelize.DataTypes.BOOLEAN },
                { transaction }
            );
            await queryInterface.addColumn(
                'user',
                'id_customer',
                { type: Sequelize.DataTypes.INTEGER.UNSIGNED },
                { transaction }
            );
            await queryInterface.addConstraint(
                'user',
                ['id_customer'],
                {
                    fields: ['id_customer'],
                    type: 'foreign key',
                    name: 'fk_user_customer',
                    references: {
                        table: 'sh_fix_customer',
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
            await queryInterface.removeColumn('user', 'finished_registration', { transaction });
            await queryInterface.removeColumn('user', 'id_customer', { transaction });
        } catch (err) {
            transaction.rollback();
            throw err;
        }
    },
};

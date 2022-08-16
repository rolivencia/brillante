'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.renameTable('sh_fix_client', 'sh_fix_customer', { transaction });
            await queryInterface.changeColumn('sh_fix_customer', 'client_id', {
                type: Sequelize.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            });
            await queryInterface.renameColumn('sh_fix_customer', 'client_id', 'id', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'nombre', 'first_name', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'apellido', 'last_name', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'telefono', 'telephone_number', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'direccion', 'address', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'fecha_creacion', 'created_at', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'fecha_modificacion', 'updated_at', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'usuario_creador', 'created_by', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'usuario_modificador', 'updated_by', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'habilitado', 'enabled', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'eliminado', 'deleted', { transaction });
            await queryInterface.removeColumn('sh_fix_customer', 'usuario');
            await queryInterface.removeColumn('sh_fix_customer', 'telefono2');
        } catch (err) {
            transaction.rollback();
            throw err;
        }
    },

    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addColumn('sh_fix_customer', 'telefono2', {
                type: Sequelize.DataTypes.STRING,
            });
            await queryInterface.addColumn('sh_fix_customer', 'usuario', { type: Sequelize.DataTypes.STRING });

            await queryInterface.renameColumn('sh_fix_customer', 'deleted', 'eliminado', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'enabled', 'habilitado', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'updated_by', 'usuario_modificador', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'created_by', 'usuario_creador', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'updated_at', 'fecha_modificacion', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'created_at', 'fecha_creacion', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'address', 'direccion', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'telephone_number', 'telefono', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'last_name', 'apellido', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'first_name', 'nombre', { transaction });
            await queryInterface.renameColumn('sh_fix_customer', 'id', 'client_id', { transaction });
            await queryInterface.changeColumn('sh_fix_customer', 'client_id', {
                type: Sequelize.DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            });
            await queryInterface.renameTable('sh_fix_customer', 'sh_fix_client', { transaction });
        } catch (err) {
            await this.down(queryInterface, Sequelize);
            transaction.rollback();
            throw err;
        }
    },
};

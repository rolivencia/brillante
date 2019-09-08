const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.legacyDbConnector();

const Client = require('server/client/client.model');

class Repair extends Sequelize.Model {}

module.exports = () => Repair;

Repair.init(
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            field: 'repair_id'
        },
        idClient: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'sh_fix_client',
                key: 'client_id'
            },
            field: 'client_id'
        },
        manufacturer: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'marca'
        },
        idEquipment: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'tipo_equipo'
        },
        model: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'modelo'
        },
        imei: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'imei'
        },
        issue: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'problema'
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'nota'
        },
        idStatus: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'sh_fix_tab_status',
                key: 'idStatus'
            },
            field: 'id_status'
        },
        dischargeDate: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'fecha_ingreso'
        },
        updatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'fecha_ultima_actualizacion'
        },
        finishedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'fecha_reparacion_terminada'
        },
        payInAdvance: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            field: 'senia_reparacion'
        },
        repairCost: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            field: 'costo_reparacion'
        },
        repairPrice: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            field: 'precio_reparacion'
        },
        equipmentTurnedOn: {
            type: Sequelize.TINYINT,
            allowNull: false,
            field: 'encendido'
        },
        createdBy: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'usuario_creador'
        },
        updatedBy: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'usuario_modificador'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'fecha_creacion'
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'fecha_modificacion'
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'habilitado'
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'eliminado'
        }
    },
    {
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_repair'
    }
);

Repair.belongsTo(Client(), { as: 'client', foreignKey: 'idClient' });

Client().hasMany(Repair, {
    as: 'repair',
    foreignKey: 'idRepair'
});

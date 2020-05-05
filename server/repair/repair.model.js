const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.legacyDbConnector();

const Client = require('server/client/client.model');
const repairStatus = require('server/repair/repair.status');

class Repair extends Sequelize.Model {}
class RepairStatusHistory extends Sequelize.Model {}

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
                key: 'id'
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

RepairStatusHistory.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'repair_status_history_id'
        },
        idRepair: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'repair_id'
        },
        idStatus: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'sh_fix_tab_status',
                key: 'id'
            },
            field: 'status_id'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_date_tz'
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'modified_date_tz'
        },
        updatedBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'modified_user_id'
        },
        cost: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'repair_cost'
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'repair_price'
        },
        paymentInAdvance: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            field: 'repair_pay_in_advance'
        }
    },
    {
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_repair_status_history'
    }
);

RepairStatusHistory.belongsTo(repairStatus.RepairStatus, { as: 'status', foreignKey: 'status_id' });
//repairStatus.RepairStatus.belongsTo(Repair, { as: 'repair', foreignKey: 'status_id' });
repairStatus.RepairStatus.hasMany(RepairStatusHistory, { as: 'repairStatusHistory', foreignKey: 'status_id' });

Repair.belongsTo(Client(), { as: 'client', foreignKey: 'idClient' });

Client().hasMany(Repair, {
    as: 'repair',
    foreignKey: 'idRepair'
});

module.exports = { Repair, RepairStatusHistory };

const Sequelize = require('sequelize');
const connector = require('server/_helpers/mysql-connector');
const sequelizeConnector = connector.sequelizeConnector();

const customer = require('server/customer/customer.model');
const user = require('server/users/user.model');
const repairStatus = require('server/repair/repair.status');

class Repair extends Sequelize.Model {}
class RepairStatusHistory extends Sequelize.Model {}

Repair.init(
    {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            field: 'repair_id',
        },
        idClient: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'sh_fix_client',
                key: 'client_id',
            },
            field: 'client_id',
        },
        manufacturer: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'marca',
        },
        idEquipment: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'tipo_equipo',
        },
        model: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'modelo',
        },
        imei: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'imei',
        },
        issue: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'problema',
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'nota',
        },
        idStatus: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'sh_fix_tab_status',
                key: 'id',
            },
            field: 'id_status',
        },
        dischargeDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            field: 'fecha_ingreso',
        },
        updatedDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            field: 'fecha_ultima_actualizacion',
        },
        finishedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'fecha_reparacion_terminada',
        },
        paymentInAdvance: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            field: 'senia_reparacion',
        },
        repairCost: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            field: 'costo_reparacion',
        },
        repairPrice: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            field: 'precio_reparacion',
        },
        equipmentTurnedOn: {
            type: Sequelize.TINYINT,
            allowNull: false,
            field: 'encendido',
        },
        createdBy: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'usuario_creador',
            references: {
                model: 'user',
                key: 'id',
            },
        },
        updatedBy: {
            type: Sequelize.BIGINT,
            allowNull: true,
            field: 'usuario_modificador',
            references: {
                model: 'user',
                key: 'id',
            },
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            field: 'fecha_creacion',
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            field: 'fecha_modificacion',
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'habilitado',
        },
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'eliminado',
        },
        warrantyTerm: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'warranty_term',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_repair',
    }
);

RepairStatusHistory.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'repair_status_history_id',
        },
        idRepair: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'repair_id',
        },
        idStatus: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'sh_fix_tab_status',
                key: 'id',
            },
            field: 'status_id',
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            field: 'created_date_tz',
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'modified_date_tz',
        },
        updatedBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
            field: 'modified_user_id',
        },
        cost: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            field: 'repair_cost',
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            field: 'repair_price',
        },
        paymentInAdvance: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0,
            field: 'repair_pay_in_advance',
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'note',
        },
    },
    {
        timestamps: false,
        sequelize: sequelizeConnector,
        modelName: 'sh_fix_repair_status_history',
    }
);

Repair.belongsTo(repairStatus.RepairStatus, { as: 'status', foreignKey: 'id_status' });
RepairStatusHistory.belongsTo(repairStatus.RepairStatus, { as: 'status', foreignKey: 'status_id' });

Repair.belongsTo(customer.Customer, { as: 'customer', foreignKey: 'idClient' });
customer.Customer.hasMany(Repair, {
    as: 'repair',
    foreignKey: 'idRepair',
});

Repair.belongsTo(user.User, { as: 'user', foreignKey: 'usuario_creador' });
user.User.hasMany(Repair, { as: 'repair', foreignKey: 'id' });

RepairStatusHistory.belongsTo(user.User, { as: 'user', foreignKey: 'modified_user_id' });
user.User.hasMany(RepairStatusHistory, { as: 'repairStatusHistory', foreignKey: 'id' });

module.exports = { Repair, RepairStatusHistory };

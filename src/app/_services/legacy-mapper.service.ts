import * as moment from 'moment';
import { Audit } from '@app/_models/audit';
import { AuthenticationService } from '@app/_services/authentication.service';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { CashTransaction, Operation } from '@app/_models/cash-transaction';
import { Customer } from '@app/_models/customer';
import { Injectable } from '@angular/core';
import { Repair, RepairLegacy, User } from '@app/_models';
import { RepairService } from '@app/_services/repair.service';

@Injectable({
    providedIn: 'root',
})
export class LegacyMapperService {
    private currentUser: User;
    constructor(private authenticationService: AuthenticationService, private repairService: RepairService) {
        moment.locale('es');
        this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
    }

    fromLegacyRepair(repairLegacy: RepairLegacy): Repair {
        return {
            id: repairLegacy.repairId,
            customer: this.extractCustomerFromLegacyRepair(repairLegacy),
            issue: repairLegacy.problema,
            paymentInAdvance: parseFloat(repairLegacy.seniaReparacion),
            cost: parseFloat(repairLegacy.costoReparacion),
            price: parseFloat(repairLegacy.precioReparacion),
            checkIn: moment(repairLegacy.fechaIngresoDate),
            checkOut: repairLegacy.fechaReparacionTerminadaDate ? moment(repairLegacy.fechaReparacionTerminadaDate) : null,
            lastUpdate: moment(repairLegacy.fechaUltimaActualizacionDate),
            note: repairLegacy.nota,
            status: this.repairService.repairStatuses.filter((repairStatus) => repairStatus.id === repairLegacy.estadoId).pop(),
            device: {
                manufacturer: repairLegacy.marca,
                model: repairLegacy.modelo,
                deviceId: repairLegacy.imei,
                turnedOn: !!repairLegacy.encendido,
                type: this.repairService.deviceTypes.filter((deviceType) => deviceType.id === repairLegacy.tipoEquipoId).pop(),
            },
            audit: {
                enabled: true,
                deleted: false,
                createdAt: moment(repairLegacy.fechaIngresoDate),
                updatedAt: moment(repairLegacy.fechaUltimaActualizacionDate),
                createdBy: this.authenticationService.currentUserValue,
            },
        };
    }

    extractCustomerFromLegacyRepair(repairLegacy: RepairLegacy): Customer {
        return {
            id: repairLegacy.clientId,
            dni: repairLegacy.dniCliente,
            firstName: repairLegacy.nombreCliente,
            lastName: repairLegacy.apellidoCliente,
            email: repairLegacy.emailCliente,
            address: repairLegacy.direccionCliente,
            telephone: repairLegacy.telefonoCliente.toString(),
            secondaryTelephone: repairLegacy.telefonoCliente.toString(),
            user: null,
        };
    }

    /**
     * Transforma los objetos Repair del nuevo cliente HTML5 al formato que acepta el API legacy
     * @deprecated
     * @param customer - Instancia de cliente
     * @param repair - Instancia de reparación
     */
    toLegacyRepairCreate(customer: Customer, repair: Repair) {
        return {
            clientId: customer.id,
            tipoEquipo: repair.device.type.id.toString(),
            marca: repair.device.manufacturer,
            modelo: repair.device.model,
            imei: repair.device.deviceId,
            problema: repair.issue,
            seniaReparacion: repair.paymentInAdvance,
            encendido: repair.device.turnedOn ? 1 : 0,
            usuario: this.currentUser.id,
        };
    }

    /**
     * Genera el objeto para actualizar una reparación con el API legacy
     * @deprecated
     * @param repair - Reparación
     * @param generateTransaction - Boolean. Determina si se anota en caja el ingreso de la reparación.
     */

    public toLegacyRepairTracking(repair: Repair, generateTransaction?: boolean) {
        return {
            repairId: repair.id,
            statusId: repair.status.id,
            nota: repair.note,
            seniaReparacion: repair.paymentInAdvance,
            costoReparacion: repair.cost,
            precioReparacion: repair.price,
            generateTransaction: generateTransaction ? generateTransaction : false,
        };
    }

    public toLegacyRepairDescription(repair: Repair) {
        return {
            repairId: repair.id,
            marca: repair.device.manufacturer,
            modelo: repair.device.model,
            imei: repair.device.deviceId,
            problema: repair.issue,
            tipoEquipo: repair.device.type.id,
        };
    }

    /**
     * Transforma los objetos Customer del nuevo cliente HTML5 al formato que acepta el API legacy
     * @deprecated
     * @param customer - Instance of Customer class
     */
    toLegacyCustomerCreate(customer: Customer) {
        return {
            nombre: customer.firstName,
            apellido: customer.lastName,
            dni: customer.dni,
            direccion: customer.address,
            telefono: customer.telephone,
            email: customer.email,
        };
    }

    /**
     * Transforms an instance of CashTransaction to the structure of the legacy API to create a new transaction
     * @deprecated
     * @param transaction - Instance of CashTransaction class
     */
    toLegacyCashTransaction(transaction: CashTransaction) {
        return {
            transactionId: transaction.id,
            transactionTypeId: transaction.concept.transactionType.id,
            conceptId: transaction.concept.id,
            amount: transaction.amount,
            note: transaction.note,
            createdUserId: this.authenticationService.currentUserValue.id,
            entityId: transaction.operation.id,
            dateTime: transaction.date.format('YYYY-MM-DD HH:mm:ss'),
        };
    }

    fromLegacyCashTransaction(
        {
            amount,
            concept,
            conceptId,
            creatorUser,
            creatorUserId,
            date,
            inputAmount,
            note,
            outputAmount,
            parentConcept,
            parentConceptId,
            repairId,
            saleId,
            stockId,
            transactionId,
            transactionType,
            transactionTypeId,
        },
        transactionConcepts
    ): CashTransaction {
        const audit = new Audit();

        const transactionConcept = transactionConcepts.filter((c) => c.id === parentConceptId)[0];
        const transactionSubConcept = transactionConcept.children.filter((c) => c.id === conceptId)[0];

        const transactionAmount = parseFloat(amount ? amount : inputAmount ? inputAmount : outputAmount);

        audit.createdBy = new User();
        audit.createdBy.id = creatorUserId;
        audit.createdBy.username = creatorUser;

        return {
            id: transactionId,
            concept: transactionSubConcept,
            amount: transactionAmount,
            date: moment(date),
            note: note,
            audit: audit,
            operation: this.fromLegacyTransactionOperation(repairId, saleId, stockId),
        };
    }

    fromLegacyTransactionOperation(repairId, saleId, stockId): Operation {
        const operation: Operation = new Operation();

        if (repairId) {
            operation.id = repairId;
            operation.description = 'Reparación';
        } else if (saleId) {
            operation.id = saleId;
            operation.description = 'Venta';
        } else if (stockId) {
            operation.id = stockId;
            operation.description = 'Compra';
        }

        return operation;
    }
}

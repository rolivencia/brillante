import { Injectable } from '@angular/core';
import { Customer } from '@app/_models/customer';
import { Repair, RepairLegacy, User } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { RepairService } from '@app/_services/repair.service';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class LegacyMapperService {
    private currentUser: User;
    constructor(private authenticationService: AuthenticationService, private repairService: RepairService) {
        moment.locale('es');
        this.authenticationService.currentUser.subscribe(x => (this.currentUser = x));
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
            status: this.repairService.repairStatuses.filter(repairStatus => repairStatus.id === repairLegacy.estadoId).pop(),
            device: {
                manufacturer: repairLegacy.marca,
                model: repairLegacy.modelo,
                deviceId: repairLegacy.imei,
                turnedOn: !!repairLegacy.encendido,
                type: this.repairService.deviceTypes.filter(deviceType => deviceType.id === repairLegacy.tipoEquipoId).pop()
            },
            audit: {
                enabled: true,
                deleted: false,
                createdAt: moment(repairLegacy.fechaIngresoDate),
                updatedAt: moment(repairLegacy.fechaUltimaActualizacionDate),
                createdBy: this.authenticationService.currentUserValue
            }
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
            user: null
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
            usuario: this.currentUser.id
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
            generateTransaction: generateTransaction ? generateTransaction : false
        };
    }

    public toLegacyRepairDescription(repair: Repair) {
        return {
            repairId: repair.id,
            marca: repair.device.manufacturer,
            modelo: repair.device.model,
            imei: repair.device.deviceId,
            problema: repair.issue,
            tipoEquipo: repair.device.type.id
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
            email: customer.email
        };
    }

    /**
     * Transforms an instance of Cliente in wp-brillante to an instance of the Customer class
     * @param clientId - id
     * @param nombre - nombre
     * @param apellido - apellido
     * @param direccion - direccion
     * @param dni - dni
     * @param email - email
     * @param telefono - telefono
     * @param secondaryTelephone - secondaryTelephone
     * @param usuario - usuario
     * @param code - code
     * @param message - message
     */
    fromLegacyCustomer({
        clientId,
        nombre,
        apellido,
        direccion,
        dni,
        email,
        telefono,
        secondaryTelephone,
        usuario,
        code,
        message
    }): Customer {
        const customer: Customer = {
            id: clientId,
            firstName: nombre,
            lastName: apellido,
            address: direccion,
            dni: dni,
            email: email,
            telephone: telefono,
            secondaryTelephone: secondaryTelephone,
            user: null
        };

        customer.user = new User();

        if (usuario) {
            customer.user.id = usuario;
        }

        return customer;
    }
}

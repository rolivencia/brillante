import { Injectable } from '@angular/core';
import { Customer } from '@app/_models/customer';
import { Repair, User } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class LegacyMapperService {
    private currentUser: User;
    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    }

    /**
     * Transforma los objetos del nuevo cliente HTML5 a
     * @deprecated
     * @param customer - Instancia de cliente
     * @param repair - Instancia de reparación
     */
    toLegacyRepairCreate(customer: Customer, repair: Repair) {
        return {
            clientId: customer.id,
            tipoEquipo: repair.device.type.id,
            marca: repair.device.manufacturer,
            modelo: repair.device.model,
            imei: repair.device.deviceId,
            problema: repair.issue,
            seniaReparacion: repair.paymentInAdvance,
            encendido: repair.device.turnedOn,
            usuario: this.currentUser.id
        };
    }

    /**
     * Transforms an instance of Customer to an instance of Cliente in wp-brillante
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
        console.log({ status: { code: code, message: message } });

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

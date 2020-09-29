import * as moment from 'moment';
import { AuthenticationService } from '@app/_services/authentication.service';
import { CashTransaction } from '@app/_models/cash-transaction';
import { Customer } from '@app/_models/customer';
import { Injectable } from '@angular/core';
import { Repair, User } from '@app/_models';

@Injectable({
    providedIn: 'root',
})
export class LegacyMapperService {
    private currentUser: User;
    constructor(private authenticationService: AuthenticationService) {
        moment.locale('es');
        this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
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
            warrantyTerm: repair.warrantyTerm,
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
}

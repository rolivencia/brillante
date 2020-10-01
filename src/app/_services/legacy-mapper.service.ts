import * as moment from 'moment';
import { AuthenticationService } from '@app/_services/authentication.service';
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
}

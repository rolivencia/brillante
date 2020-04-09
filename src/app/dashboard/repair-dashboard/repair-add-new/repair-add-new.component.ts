import { Component, OnInit } from '@angular/core';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { Repair, RepairLegacy } from '@app/_models';
import { ClientService } from '@app/_services/client.service';

@Component({
    selector: 'app-repair-add-new',
    templateUrl: './repair-add-new.component.html',
    styleUrls: ['./repair-add-new.component.scss', '../repair-dashboard.component.scss']
})
export class RepairAddNewComponent implements OnInit {
    constructor(private customerService: ClientService, public repairDashboardService: RepairDashboardService) {}

    public newRepair: RepairLegacy = new RepairLegacy();
    public newCustomer: Customer = new Customer();

    ngOnInit() {}

    //FIXME: DNI must be only of the string type
    //TODO: Agregar debounce para evitar llamar rápido una y otra vez
    getExistingCustomer(dni: string | number) {
        if (dni.toString().length > 7) {
            this.customerService.getByDniLegacy(dni).subscribe(result => {
                this.newCustomer = this.legacyCustomerMapper(result);
            });
        }
    }

    clean() {
        this.newRepair = new RepairLegacy();
        this.newCustomer = new Customer();
    }

    legacyCustomerMapper({
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
        return {
            id: clientId,
            firstName: nombre,
            lastName: apellido,
            address: direccion,
            dni: dni,
            email: email,
            primaryTelephone: telefono,
            secondaryTelephone: secondaryTelephone,
            idUser: usuario
        };
    }
}

export class Customer {
    public id?: number;
    public dni: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public address: string;
    public primaryTelephone: string;
    public secondaryTelephone: string;
    public idUser?: number;

    constructor() {}
}

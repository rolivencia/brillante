import { Component, OnInit } from '@angular/core';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { Repair, RepairLegacy } from '@app/_models';

@Component({
    selector: 'app-repair-add-new',
    templateUrl: './repair-add-new.component.html',
    styleUrls: ['./repair-add-new.component.scss', '../repair-dashboard.component.scss']
})
export class RepairAddNewComponent implements OnInit {
    constructor(public repairDashboardService: RepairDashboardService) {}

    public newRepair: RepairLegacy = new RepairLegacy();
    public newCustomer: CustomerLegacy = new CustomerLegacy();

    ngOnInit() {}

    //FIXME: DNI must be only of the string type
    //TODO: Agregar debounce para evitar llamar rápido una y otra vez
    getExistingCustomer(dni: string | number) {
        const sDni = dni.toString();
        if (sDni.length > 7) {
        }
    }

    clean() {
        this.newRepair = new RepairLegacy();
        this.newCustomer = new CustomerLegacy();
    }
}

export class CustomerLegacy {
    public id?: number;
    public dni: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public address: string;
    public telephone: number;

    constructor() {}
}

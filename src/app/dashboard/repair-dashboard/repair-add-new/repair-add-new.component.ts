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
    public newClient: ClientLegacy = new ClientLegacy();

    ngOnInit() {}
}

export class ClientLegacy {
    public id?: number;
    public dni: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public address: string;
    public telephone: number;

    constructor() {}
}

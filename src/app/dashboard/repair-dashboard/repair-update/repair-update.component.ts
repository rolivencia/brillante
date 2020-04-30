import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RepairFormHandlerService } from '@app/dashboard/repair-dashboard/repair-form-handler.service';

@Component({
    selector: 'app-repair-update',
    templateUrl: './repair-update.component.html',
    styleUrls: ['./repair-update.component.scss', '../repair-dashboard.component.scss']
})
export class RepairUpdateComponent implements OnInit {
    constructor(public location: Location, public repairFormHandlerService: RepairFormHandlerService) {}

    ngOnInit() {}

    // FIXME: Implement this method
    public print() {}
}

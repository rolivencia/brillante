import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RepairFormHandlerService } from '@app/dashboard/repair-dashboard/repair-form-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-repair-update',
    templateUrl: './repair-update.component.html',
    styleUrls: ['./repair-update.component.scss', '../repair-dashboard.component.scss']
})
export class RepairUpdateComponent implements OnInit {
    constructor(public location: Location, public repairFormHandlerService: RepairFormHandlerService, private route: ActivatedRoute) {}

    ngOnInit() {
        if (this.route.snapshot.data['legacyRepair']) {
            const dummyRepair = this.route.snapshot.data['legacyRepair'];
            console.log(dummyRepair);
        }
    }

    // FIXME: Implement this method
    public print() {}
}

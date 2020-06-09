import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairFormHandlerService } from '@app/dashboard/repair-dashboard/repair-form-handler.service';
import { RepairService } from '@app/_services/repair.service';

@Component({
    selector: 'app-repair-add-new',
    templateUrl: './repair-add-new.component.html',
    styleUrls: ['./repair-add-new.component.scss', '../repair-dashboard.component.scss']
})
export class RepairAddNewComponent implements OnInit {
    constructor(
        private cdr: ChangeDetectorRef,
        public location: Location,
        public repairDashboardService: RepairDashboardService,
        public repairFormHandlerService: RepairFormHandlerService,
        public repairService: RepairService
    ) {}

    ngOnInit() {
        this.repairFormHandlerService.formGroup = this.repairFormHandlerService.load();
        this.cdr.detectChanges();
    }
}

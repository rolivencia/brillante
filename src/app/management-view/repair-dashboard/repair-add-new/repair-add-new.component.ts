import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RepairFormHandlerService } from '@management-view/repair-dashboard/repair-form-handler.service';
import { RepairService } from '@services/repair.service';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'app-repair-add-new',
    templateUrl: './repair-add-new.component.html',
    styleUrls: ['./repair-add-new.component.scss', '../repair-dashboard.component.scss'],
})
export class RepairAddNewComponent implements OnInit {
    public deviceTypeFields: FieldSettingsModel = { text: 'description', value: 'id' };

    constructor(
        private cdr: ChangeDetectorRef,
        public location: Location,
        public repairFormHandlerService: RepairFormHandlerService,
        public repairService: RepairService
    ) {}

    ngOnInit() {
        this.repairFormHandlerService.formGroup = this.repairFormHandlerService.load();
        this.cdr.detectChanges();
    }
}

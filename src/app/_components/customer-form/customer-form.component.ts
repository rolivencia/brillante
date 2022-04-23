import { Component, OnInit } from '@angular/core';
import { RepairFormHandlerService } from '@management-view/repair-dashboard/repair-form-handler.service';
import { RepairService } from '@services/repair.service';
import { ControlContainer, FormGroup } from '@angular/forms';
import { CustomerFormService } from '@components/customer-form/customer-form.service';
import { MaskedDateTimeService } from '@syncfusion/ej2-angular-calendars';
import { MaskPlaceholderModel } from '@syncfusion/ej2-calendars/src/common/maskplaceholder-model';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss'],
    providers: [MaskedDateTimeService],
})
export class CustomerFormComponent implements OnInit {
    get customerControl() {
        return this.form.controls;
    }

    get customerExists(): boolean {
        return this.repairFormHandlerService.customerExists;
    }

    get formSaved(): boolean {
        return this.repairFormHandlerService.saved;
    }

    get formSubmitted(): boolean {
        return this.repairFormHandlerService.submitted;
    }

    public form: FormGroup;
    public displayMonths = 1;
    public navigation = 'select';
    public outsideDays = 'visible';

    public maskPlaceholderValue: MaskPlaceholderModel = { day: 'DD', month: 'MM', year: 'AAAA' };

    constructor(
        public repairFormHandlerService: RepairFormHandlerService,
        public repairService: RepairService,
        private controlContainer: ControlContainer,
        public customerFormService: CustomerFormService
    ) {}

    ngOnInit(): void {
        this.form = <FormGroup>this.controlContainer.control;
    }
}

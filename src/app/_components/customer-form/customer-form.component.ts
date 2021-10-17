import { Component, OnInit } from '@angular/core';
import { RepairFormHandlerService } from '@management-view/repair-dashboard/repair-form-handler.service';
import { RepairService } from '@services/repair.service';
import { ControlContainer, FormGroup } from '@angular/forms';
import { CustomerFormService } from '@components/customer-form/customer-form.service';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
    public form: FormGroup;
    public displayMonths = 1;
    public navigation = 'select';
    public outsideDays = 'visible';

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

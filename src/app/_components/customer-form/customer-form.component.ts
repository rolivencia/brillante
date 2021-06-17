import { Component, Input, OnInit } from '@angular/core';
import { RepairFormHandlerService } from '@app/dashboard/repair-dashboard/repair-form-handler.service';
import { RepairService } from '@app/_services/repair.service';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
    public form: FormGroup;

    constructor(
        public repairFormHandlerService: RepairFormHandlerService,
        public repairService: RepairService,
        private controlContainer: ControlContainer
    ) {}

    ngOnInit(): void {
        // this.form = this.parentForm.form;
        // this.form.addControl('customer', this.parentForm.form['customer']);
        this.form = <FormGroup>this.controlContainer.control;
    }
}

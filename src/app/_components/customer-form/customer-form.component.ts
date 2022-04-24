import { Component, Input, OnInit } from '@angular/core';
import { RepairFormHandlerService } from '@management-view/repair-dashboard/repair-form-handler.service';
import { ControlContainer, FormGroup } from '@angular/forms';
import { CustomerFormService } from '@components/customer-form/customer-form.service';
import { MaskedDateTimeService } from '@syncfusion/ej2-angular-calendars';
import { MaskPlaceholderModel } from '@syncfusion/ej2-calendars/src/common/maskplaceholder-model';
import { FormComponent } from '@components/form-component/form-component';
import { Customer } from '@models/customer';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss'],
    providers: [MaskedDateTimeService],
})
export class CustomerFormComponent extends FormComponent<Customer> implements OnInit {
    @Input() customerExists: boolean = false;
    @Input() saved: boolean = false;
    @Input() submitted: boolean = false;

    get controls() {
        return this.form.controls;
    }

    public form: FormGroup;
    public maskPlaceholderValue: MaskPlaceholderModel = { day: 'DD', month: 'MM', year: 'AAAA' };

    constructor(
        public repairFormHandlerService: RepairFormHandlerService,
        private controlContainer: ControlContainer,
        public customerFormService: CustomerFormService
    ) {
        super();
    }

    ngOnInit(): void {
        this.form = <FormGroup>this.controlContainer.control;
    }
}

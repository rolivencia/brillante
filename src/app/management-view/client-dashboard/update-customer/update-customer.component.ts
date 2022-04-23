import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '@models/customer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerFormService } from '@components/customer-form/customer-form.service';

@Component({
    selector: 'app-update-customer',
    templateUrl: './update-customer.component.html',
    styleUrls: ['./update-customer.component.scss'],
})
export class UpdateCustomerComponent implements OnInit {
    get customer(): Customer {
        return this._customer;
    }

    private _customer: Customer;
    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private customerFormService: CustomerFormService
    ) {}

    ngOnInit(): void {
        this._customer = this.route.snapshot.data['customer'] as Customer;
        if (this._customer) {
            this.form = this.customerFormService.buildForm(this._customer);
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '@models/customer';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CustomerFormService } from '@components/customer-form/customer-form.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CustomerService } from '@services/customer.service';

@Component({
    selector: 'app-update-customer',
    templateUrl: './update-customer.component.html',
    styleUrls: ['./update-customer.component.scss'],
    standalone: false,
})
export class UpdateCustomerComponent implements OnInit {
    get customer(): Customer {
        return this._customer;
    }

    private _customer: Customer;
    public form: UntypedFormGroup;

    public saved: boolean = false;
    public submitted: boolean = false;

    constructor(
        public location: Location,
        private customerFormService: CustomerFormService,
        private customerService: CustomerService,
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this._customer = this.route.snapshot.data['customer'] as Customer;
        if (this._customer) {
            this.form = this.customerFormService.buildForm(this._customer);
        }
    }

    public async update() {
        this.submitted = true;
        if (this.form.invalid) {
            this.toastrService.error('Datos de formulario inválidos. Revea los datos ingresados e intente nuevamente');
            return;
        }

        this.customerService.update(this.form.value).subscribe((result) => {
            if (result) {
                this.saved = true;
                this.toastrService.success('Datos del cliente actualizados correctamente');
            }
        });
    }
}

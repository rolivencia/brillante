import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '@models/customer';

@Injectable({
    providedIn: 'root',
})
export class CustomerFormService {
    constructor(private formBuilder: FormBuilder) {}

    buildForm(customer: Customer): FormGroup {
        return this.formBuilder.group({
            id: [customer.id],
            dni: [customer.dni, [Validators.required, Validators.minLength(7)]],
            firstName: [customer.firstName, [Validators.required, Validators.minLength(2)]],
            lastName: [customer.lastName, [Validators.required, Validators.minLength(2)]],
            birthDate: [customer.birthDate],
            email: [customer.email, [Validators.required, Validators.email]],
            address: [customer.address, [Validators.required]],
            telephone: [customer.telephone, [Validators.required, Validators.pattern('[0-9]+')]],
            secondaryTelephone: [customer.telephone, [Validators.pattern('[0-9]+')]],
        });
    }
}

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '@app/_models/customer';
import { Repair } from '@app/_models';

@Injectable({
    providedIn: 'root'
})
export class RepairFormHandlerService {
    set customer(value: Customer) {
        this._customer = value;
    }

    set repair(value: Repair) {
        this._repair = value;
    }

    get formGroup(): FormGroup {
        return this._formGroup;
    }

    set formGroup(value: FormGroup) {
        this._formGroup = value;
    }

    private _customer: Customer;
    private _repair: Repair;

    private _formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    public loadForm(customer: Customer = this.customer, repair: Repair = this.repair): FormGroup {
        return this.formBuilder.group({
            customer: this.formBuilder.group({
                id: [customer.id],
                dni: [customer.dni, [Validators.required, Validators.minLength(7)]],
                firstName: [customer.firstName, [Validators.required, Validators.minLength(2)]],
                lastName: [customer.lastName, [Validators.required, Validators.minLength(2)]],
                email: [customer.email, [Validators.required, Validators.email]],
                address: [customer.address, [Validators.required]],
                telephone: [customer.telephone, [Validators.required, Validators.pattern('[0-9]+')]]
            }),
            repair: this.formBuilder.group({
                id: [repair.id],
                device: this.formBuilder.group({
                    turnedOn: [repair.device.turnedOn, Validators.required],
                    type: [repair.device.type, Validators.required],
                    manufacturer: [repair.device.manufacturer, Validators.required],
                    model: [repair.device.model, Validators.required],
                    deviceId: [repair.device.deviceId]
                }),
                issue: [repair.issue, [Validators.required]],
                paymentInAdvance: [repair.paymentInAdvance, Validators.required]
            })
        });
    }
}

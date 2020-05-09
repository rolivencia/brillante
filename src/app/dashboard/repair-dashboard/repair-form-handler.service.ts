import { Customer } from '@app/_models/customer';
import { CustomerService } from '@app/_services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { Repair } from '@app/_models';
import { RepairService } from '@app/_services/repair.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class RepairFormHandlerService {
    get registerPayment(): boolean {
        return this._registerPayment;
    }

    set registerPayment(value: boolean) {
        this._registerPayment = value;
    }
    get saved(): boolean {
        return this._saved;
    }

    set saved(value: boolean) {
        this._saved = value;
    }
    get customerControl() {
        return this.formGroup.controls.customer['controls'];
    }

    get repairControl() {
        return this.formGroup.controls.repair['controls'];
    }

    get deviceControl() {
        return this.repairControl['device']['controls'];
    }

    get customerExists(): boolean {
        return this._customerExists;
    }

    set customerExists(value: boolean) {
        this._customerExists = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get customer(): Customer {
        return this._customer;
    }

    set customer(value: Customer) {
        this._customer = value;
    }

    get repair(): Repair {
        return this._repair;
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

    private _customerExists: boolean = false;
    private _submitted: boolean = false;
    private _saved: boolean = false;
    private _registerPayment: boolean = false;

    private _customer: Customer = new Customer();
    private _repair: Repair = new Repair();

    private _formGroup: FormGroup;

    constructor(
        private customerService: CustomerService,
        private legacyMapperService: LegacyMapperService,
        private formBuilder: FormBuilder,
        private repairService: RepairService,
        private toastrService: ToastrService
    ) {}

    public loadForm(customer: Customer = this.customer, repair: Repair = this.repair): FormGroup {
        return this.formBuilder.group({
            customer: this.formBuilder.group({
                id: [customer.id],
                dni: [customer.dni, [Validators.required, Validators.minLength(7)]],
                firstName: [customer.firstName, [Validators.required, Validators.minLength(2)]],
                lastName: [customer.lastName, [Validators.required, Validators.minLength(2)]],
                email: [customer.email, [Validators.required, Validators.email]],
                address: [customer.address, [Validators.required]],
                telephone: [customer.telephone, [Validators.required, Validators.pattern('[0-9]+')]],
                secondaryTelephone: [customer.telephone, [Validators.pattern('[0-9]+')]]
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
                status: [repair.status, Validators.required],
                note: [repair.note],
                issue: [repair.issue, [Validators.required]],
                paymentInAdvance: [repair.paymentInAdvance, Validators.required],
                price: [repair.paymentInAdvance, Validators.required],
                cost: [repair.paymentInAdvance, Validators.required]
            })
        });
    }

    /**
     * Reverts form to initial status, with empty customer and repair data
     */
    public clean() {
        this.customerExists = false;
        this.submitted = false;
        this.repair = new Repair();
        this.customer = new Customer();
        this.patchCustomer();
        this.patchRepair();
    }

    public patchCustomer(customer: Customer = this.customer) {
        this.formGroup.patchValue({
            customer: {
                id: customer.id,
                dni: customer.dni,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                address: customer.address,
                telephone: customer.telephone
            }
        });
    }

    public patchRepair(repair: Repair = this.repair) {
        this.formGroup.patchValue({
            repair: {
                id: repair.id,
                device: {
                    turnedOn: repair.device.turnedOn,
                    type: repair.device.type,
                    manufacturer: repair.device.manufacturer,
                    model: repair.device.model,
                    deviceId: repair.device.deviceId
                },
                issue: repair.issue,
                paymentInAdvance: repair.paymentInAdvance
            }
        });
    }

    public async getExistingCustomer() {
        this.customerExists = false;

        const dni = this.customerControl['dni'].value?.toString();

        if (dni) {
            const result = await this.customerService.getByDniLegacy(dni).toPromise();
            this.customerExists = result.code !== 0;
            if (this.customerExists) {
                this.customer = this.legacyMapperService.fromLegacyCustomer(result);
                this.patchCustomer();
            }
        } else {
            this.customerExists = false;
        }
    }

    public assignRepairForm(repairForm = this.repairControl, deviceForm = this.deviceControl) {
        this.repair = {
            id: repairForm.id.value,
            customer: this.customer,
            device: {
                turnedOn: deviceForm.turnedOn.value,
                type: deviceForm.type.value,
                manufacturer: deviceForm.manufacturer.value,
                model: deviceForm.model.value,
                deviceId: deviceForm.deviceId.value
            },
            status: repairForm.status.value,
            note: repairForm.note.value,
            issue: repairForm.issue.value,
            paymentInAdvance: repairForm.paymentInAdvance.value,
            price: repairForm.price.value,
            cost: repairForm.cost.value,

            // Read-only attributes - Modified by database
            checkIn: this.repair.checkIn,
            checkOut: this.repair.checkOut,
            lastUpdate: this.repair.lastUpdate,
            audit: this.repair.audit
        };
    }

    //FIXME: Add "user" and "secondaryTelephone" missing attributes. Delete ...
    assignCustomerForm(customerForm = this.customerControl) {
        this.customer = {
            ...this.customer,
            id: customerForm.id.value,
            dni: customerForm.dni.value,
            firstName: customerForm.firstName.value,
            lastName: customerForm.lastName.value,
            email: customerForm.email.value,
            telephone: customerForm.telephone.value,
            address: customerForm.address.value
        };
    }

    async save() {
        this.submitted = true;

        if (this.formGroup.invalid) {
            this.toastrService.info('Falta llenar campos para dar de alta esta reparación.');
            return;
        }

        this.assignCustomerForm();
        this.assignRepairForm();

        this.patchCustomer();
        this.patchRepair();

        const legacyCustomer = this.legacyMapperService.toLegacyCustomerCreate(this.customer);
        if (!this.customerExists) {
            const savedCustomer = await this.customerService.createLegacy(legacyCustomer).toPromise();
            this.customer.id = savedCustomer?.id;
            if (!savedCustomer?.code) {
                this.toastrService.error('Error al registrar cliente.');
                return;
            }
        }

        const legacyRepair = this.legacyMapperService.toLegacyRepairCreate(this.customer, this.repair);
        const result = await this.repairService.createLegacy(legacyRepair).toPromise();

        if (!result || result.errorCode || result.historyErrorCode) {
            if (result.errorCode) {
                this.toastrService.error(result.errorCode);
            }
            if (result.historyErrorCode) {
                this.toastrService.error(result.historyErrorCode);
            }
        } else if (result && result.id) {
            this.toastrService.success(`Reparación ID: ${result.id} agregada con éxito`);
        }
    }

    public async update() {
        this.submitted = true;

        if (this.formGroup.invalid) {
            this.toastrService.info('Falta llenar campos para modificar esta reparación.');
            return;
        }

        if (this.formGroup.pristine) {
            this.toastrService.info('Debe realizar cambios para poder guardar esta reparación');
            return;
        }

        this.assignCustomerForm();
        this.assignRepairForm();

        this.patchCustomer();
        this.patchRepair();

        const legacyRepairTracking = this.legacyMapperService.toLegacyRepairTracking(this.repair, this.registerPayment);
        const result = await this.repairService.updateLegacy(legacyRepairTracking).toPromise();

        if (!result) {
            if (result.errorCode) {
                this.toastrService.error(result.errorCode);
            }
        } else if (result) {
            this.toastrService.success(result.message);
            this.saved = true;
        }

        // TODO: Proceder a actualizar el historial de la reparación al recibir la respuesta.
    }
}
import { Customer } from '@models/customer';
import { CustomerService } from '@services/customer.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { PaymentMethod } from '@models/cash-transaction';
import { RepairService } from '@services/repair.service';
import { ToastrService } from 'ngx-toastr';
import { toMoment } from '@models/date-object';
import { Repair, RepairStatus } from '@models/repair';
import { AuthenticationService } from '@services/authentication.service';
import { PaymentMethodsService } from '@services/payment-methods.service';

@Injectable({
    providedIn: 'root',
})
export class RepairFormHandlerService {
    get paymentMethod(): PaymentMethod {
        return this._paymentMethod;
    }

    set paymentMethod(value: PaymentMethod) {
        this._paymentMethod = value;
    }
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

    get paymentMethodGroup(): FormGroup {
        return this.formGroup.controls.payment as FormGroup;
    }

    get paymentsGroup(): FormArray {
        return this.formGroup.controls.payments as FormArray;
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
    private _paymentMethod: PaymentMethod = new PaymentMethod();

    private _customer: Customer = new Customer();
    private _repair: Repair = new Repair();

    private _formGroup: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private customerService: CustomerService,
        private formBuilder: FormBuilder,
        private paymentMethodsService: PaymentMethodsService,
        private repairService: RepairService,
        private toastrService: ToastrService
    ) {}

    public load(customer: Customer = this.customer, repair: Repair = this.repair): FormGroup {
        // Determines if the current repair has attached money transactions, which means that one or more payment methods are selected for the repair
        const hasPaymentMethodSelected: boolean =
            this.repair.moneyTransactions && this.repair.moneyTransactions.length > 0;

        return this.formBuilder.group({
            customer: this.formBuilder.group({
                id: [customer.id],
                dni: [customer.dni, [Validators.required, Validators.minLength(7)]],
                firstName: [customer.firstName, [Validators.required, Validators.minLength(2)]],
                lastName: [customer.lastName, [Validators.required, Validators.minLength(2)]],
                birthDate: [customer.birthDate],
                email: [customer.email, [Validators.required, Validators.email]],
                address: [customer.address, [Validators.required]],
                telephone: [customer.telephone, [Validators.required, Validators.pattern('[0-9]+')]],
                secondaryTelephone: [customer.telephone, [Validators.pattern('[0-9]+')]],
            }),
            repair: this.formBuilder.group({
                id: [repair.id],
                device: this.formBuilder.group({
                    turnedOn: [repair.device.turnedOn, Validators.required],
                    type: [repair.device.type, Validators.required],
                    manufacturer: [repair.device.manufacturer, Validators.required],
                    model: [repair.device.model, Validators.required],
                    deviceId: [repair.device.deviceId],
                }),
                status: [repair.status.id, Validators.required],
                note: [repair.note],
                issue: [repair.issue, [Validators.required]],
                paymentInAdvance: [repair.paymentInAdvance, Validators.required],
                price: [repair.price, Validators.required],
                cost: [repair.cost, Validators.required],
                warrantyTerm: [repair.warrantyTerm, [Validators.required, Validators.min(0), Validators.max(24)]],
            }),
            payment: this.formBuilder.group({
                // TODO: Replace for FormArray implementation
                id: [repair.moneyTransactions.length > 0 ? repair.moneyTransactions[0].id : null],
                paymentMethod: [hasPaymentMethodSelected ? repair.moneyTransactions[0].paymentMethod.id : 1],
                amount: [repair.price, Validators.required],
            }),
            payments: this.formBuilder.array([]),
        });
    }

    /**
     * Reverts form to initial status, with empty customer and repair data
     */
    public clean() {
        this.customerExists = false;
        this.submitted = false;
        this.saved = false;
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
                birthDate: customer.birthDate,
                email: customer.email,
                address: customer.address,
                telephone: customer.telephone,
            },
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
                    deviceId: repair.device.deviceId,
                },
                customer: repair.customer,
                issue: repair.issue,
                paymentInAdvance: repair.paymentInAdvance,
                cost: repair.cost,
                price: repair.price,
                status: repair.status.id,
                note: repair.note,
                warrantyTerm: repair.warrantyTerm,
            },
        });
    }

    public async getExistingCustomer() {
        this.customerExists = false;

        const dni = this.customerControl['dni'].value?.toString();

        if (dni) {
            const result = await this.customerService.getByDni(dni).toPromise();
            this.customerExists = !!result;
            if (this.customerExists) {
                this.customer = result;
                this.patchCustomer();
            }
        } else {
            this.customerExists = false;
        }
    }

    public assignRepairForm(repairForm = this.repairControl, deviceForm = this.deviceControl) {
        this.repair = {
            ...this.repair,
            id: repairForm.id.value,
            customer: this.customer,
            device: {
                turnedOn: deviceForm.turnedOn.value,
                type: deviceForm.type.value,
                manufacturer: deviceForm.manufacturer.value,
                model: deviceForm.model.value,
                deviceId: deviceForm.deviceId.value,
            },
            status: this.repairService.repairStatuses.find((x: RepairStatus) => x.id === repairForm.status.value),
            note: repairForm.note.value,
            issue: repairForm.issue.value,
            paymentInAdvance: repairForm.paymentInAdvance.value,
            price: this.paymentMethodGroup.controls.amount.value,
            cost: repairForm.cost.value,
            warrantyTerm: repairForm.warrantyTerm.value,

            // Read-only attributes - Modified by database
            checkIn: this.repair.checkIn,
            checkOut: this.repair.checkOut,
            lastUpdate: this.repair.lastUpdate,
            audit: this.repair.audit,
            history: this.repair.history,
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
            birthDate: customerForm.birthDate.value ? toMoment(customerForm.birthDate.value) : null,
            email: customerForm.email.value,
            telephone: customerForm.telephone.value,
            address: customerForm.address.value,
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

        if (!this.customerExists) {
            //TODO: Restructure after changing backend Sequelize method for "create" instead of "findOrCreate"
            const [savedCustomer, wasSaved] = await this.customerService.create(this.customer).toPromise();
            this.customer.id = savedCustomer?.id;
            if (!savedCustomer) {
                this.toastrService.error('Error al registrar cliente.');
                return;
            }
        }

        const result = await this.repairService
            .create(this.repair, this.authenticationService.currentUserValue)
            .toPromise();

        if (result && result.id) {
            this.saved = true;
            this.toastrService.success(`Reparación ID: ${result.id} agregada con éxito.`);
        } else {
            this.toastrService.error('Error al intentar agregar nueva reparación.');
        }
    }

    public async update(editDescription: boolean = false) {
        this.submitted = true;

        if (this.formGroup.invalid) {
            this.toastrService.info('Falta llenar campos para modificar esta reparación.');
            return;
        }

        if (this.formGroup.pristine) {
            this.toastrService.info('Debe realizar cambios para poder guardar esta reparación.');
            return;
        }

        this.assignCustomerForm();
        this.assignRepairForm();

        this.patchCustomer();
        this.patchRepair();

        if (editDescription || this.formGroup.controls['repair']['controls']['issue'].dirty) {
            const updateDeviceInfo = await this.repairService.updateDeviceInfo(this.repair).toPromise();
            if (!updateDeviceInfo) {
                this.toastrService.info('Error al actualizar información del dispositivo en reparación.');
                return;
            }
        }

        const generateTransaction = this.canRegisterPayment();
        const [trackingUpdateResult] = await this.repairService
            .updateTrackingInfo(this.repair, this.authenticationService.currentUserValue, {
                generateTransaction: generateTransaction,
                paymentMethod: this.paymentMethodsService.paymentMethods.find(
                    (x) => x.id === this.paymentMethodGroup.controls.paymentMethod.value
                ),
            })
            .toPromise();

        return new Promise((resolve, reject) => {
            if (trackingUpdateResult) {
                this.toastrService.success(`Reparación ID ${this.repair.id} actualizada con éxito.`);
                this.saved = true;
                resolve(true);
            } else {
                this.toastrService.error(`Error al intentar actualizar la reparación ID ${this.repair.id}.`);
                reject(false);
            }
        });
    }

    public canRegisterPayment(): boolean {
        // TODO: Mark depending also on the old status
        const newStatus = this.repairService.repairStatuses.find(
            (x: RepairStatus) => x.id === this.repairControl['status']['value']
        );

        const hasRegisteredPayments = this.repair.moneyTransactions.length > 0;

        return newStatus.id === 5 && !hasRegisteredPayments;
    }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer } from '@app/_models/customer';
import { CustomerService } from '@app/_services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { Repair, User } from '@app/_models';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairService } from '@app/_services/repair.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-repair-add-new',
    templateUrl: './repair-add-new.component.html',
    styleUrls: ['./repair-add-new.component.scss', '../repair-dashboard.component.scss']
})
export class RepairAddNewComponent implements OnInit {
    public formGroup: FormGroup;
    public repair: Repair = new Repair();
    public customer: Customer = new Customer();

    public customerExists: boolean = false;
    public submitted: boolean = false;

    constructor(
        private cdr: ChangeDetectorRef,
        public customerService: CustomerService,
        private formBuilder: FormBuilder,
        private legacyMapperService: LegacyMapperService,
        public repairDashboardService: RepairDashboardService,
        public repairService: RepairService,
        private toastrService: ToastrService
    ) {}

    ngOnInit() {
        this.loadForm();
    }

    get customerControl() {
        return this.formGroup.controls.customer['controls'];
    }

    get repairControl() {
        return this.formGroup.controls.repair['controls'];
    }

    async getExistingCustomer() {
        this.customerExists = false;

        const dni = this.formGroup.controls['customer']['controls']['dni'].value?.toString();

        if (dni) {
            const result = await this.customerService.getByDniLegacy(dni).toPromise();
            this.customerExists = result.code !== 0;
            this.customer = this.customerExists ? this.legacyMapperService.fromLegacyCustomer(result) : new Customer();
        } else {
            this.customerExists = false;
            this.customer = new Customer();
        }

        this.patchCustomer();
    }

    async save() {
        this.submitted = true;

        console.log(this.formGroup);

        if (this.formGroup.invalid) {
            alert('Falta llenar campos para poder guardar este cupón');
            return;
        }

        this.assignCustomerForm();
        this.assignRepairForm();

        this.patchCustomer();
        this.patchRepair();

        const legacyCustomer = this.legacyMapperService.toLegacyCustomerCreate(this.customer);
        if (!this.customerExists) {
            const savedCustomer = await this.customerService.createLegacy(legacyCustomer).toPromise();
            this.customer.id = savedCustomer.id ?? null;
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

    clean() {
        this.submitted = false;
        this.repair = new Repair();
        this.customer = new Customer();
    }

    assignRepairForm() {
        const repairForm = this.formGroup.controls['repair']['controls'];
        const deviceForm = this.formGroup.controls['repair']['controls']['device']['controls'];

        //FIXME: Add "note" and other missing attributes. Delete ...
        this.repair = {
            ...this.repair,
            id: repairForm.id.value,
            customer: this.customer,
            device: {
                turnedOn: deviceForm.turnedOn.value,
                type: deviceForm.type.value,
                manufacturer: deviceForm.manufacturer.value,
                model: deviceForm.model.value,
                deviceId: deviceForm.deviceId.value
            },
            issue: repairForm.issue.value,
            paymentInAdvance: repairForm.paymentInAdvance.value
        };
    }

    //FIXME: Add "user" and "secondaryTelephone" missing attributes. Delete ...
    assignCustomerForm() {
        const customerForm = this.formGroup.controls['customer']['controls'];
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

    patchRepair() {
        this.formGroup.patchValue({
            repair: {
                id: this.repair.id,
                device: {
                    turnedOn: this.repair.device.turnedOn,
                    type: this.repair.device.type,
                    manufacturer: this.repair.device.manufacturer,
                    model: this.repair.device.model,
                    deviceId: this.repair.device.deviceId
                },
                issue: this.repair.issue,
                paymentInAdvance: this.repair.paymentInAdvance
            }
        });
    }

    patchCustomer() {
        this.formGroup.patchValue({
            customer: {
                id: this.customer.id,
                firstName: this.customer.firstName,
                lastName: this.customer.lastName,
                email: this.customer.email,
                address: this.customer.address,
                telephone: this.customer.telephone
            }
        });
    }

    loadForm() {
        this.formGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                id: [this.customer.id],
                dni: [this.customer.dni, [Validators.required, Validators.minLength(7)]],
                firstName: [this.customer.firstName, [Validators.required, Validators.minLength(2)]],
                lastName: [this.customer.lastName, [Validators.required, Validators.minLength(2)]],
                email: [this.customer.email, [Validators.required, Validators.email]],
                address: [this.customer.address, [Validators.required]],
                telephone: [this.customer.telephone, [Validators.required, Validators.pattern('[0-9]+')]]
            }),
            repair: this.formBuilder.group({
                id: [this.repair.id],
                device: this.formBuilder.group({
                    turnedOn: [this.repair.device.turnedOn, Validators.required],
                    type: [this.repair.device.type, Validators.required],
                    manufacturer: [this.repair.device.manufacturer, Validators.required],
                    model: [this.repair.device.model, Validators.required],
                    deviceId: [this.repair.device.deviceId]
                }),
                issue: [this.repair.issue, [Validators.required]],
                paymentInAdvance: [this.repair.paymentInAdvance, Validators.required]
            })
        });
        this.cdr.detectChanges();
    }
}

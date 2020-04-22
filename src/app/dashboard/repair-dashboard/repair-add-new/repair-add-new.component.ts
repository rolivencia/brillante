import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Customer } from '@app/_models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Repair, User } from '@app/_models';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairService } from '@app/_services/repair.service';
import { CustomerService } from '@app/_services/customer.service';
import { AuthenticationService, UserService } from '@app/_services';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';

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

    private currentUser: User;

    constructor(
        private cdr: ChangeDetectorRef,
        public customerService: CustomerService,
        private formBuilder: FormBuilder,
        private legacyMapperService: LegacyMapperService,
        public repairDashboardService: RepairDashboardService,
        public repairService: RepairService
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

    //TODO: Agregar debounce para evitar llamar rápido una y otra vez
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

    async save() {
        this.submitted = true;

        console.log(this.formGroup);

        if (this.formGroup.invalid) {
            alert('Falta llenar campos para poder guardar este cupón');
            return;
        }

        let legacyCustomer = {};

        if (this.customerExists) {
            legacyCustomer = this.legacyMapperService.toLegacyCustomerCreate(this.customer);
        } else {
            const savedCustomer = await this.customerService.createLegacy(this.customer).toPromise();
            this.customer.id = savedCustomer.id;
        }

        const legacyRepair = this.legacyMapperService.toLegacyRepairCreate(this.customer, this.repair);
        const result = await this.repairService.createLegacy(legacyRepair);
    }

    clean() {
        this.submitted = false;
        this.repair = new Repair();
        this.customer = new Customer();
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

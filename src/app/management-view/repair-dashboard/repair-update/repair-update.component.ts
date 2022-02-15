import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RepairFormHandlerService } from '@management-view/repair-dashboard/repair-form-handler.service';
import { RepairService } from '@services/repair.service';
import { RepairVoucherGeneratorService } from '@management-view/repair-dashboard/repair-voucher-generator.service';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { Repair } from '@models/repair';
import { ChangeEventArgs, FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs as ChangeEventArgsButton } from '@syncfusion/ej2-angular-buttons';
import { FormBuilder } from '@angular/forms';
import { ERepairStatus } from '@enums/repair-status.enum';
import { EPaymentMethod } from '@enums/payment-methods.enum';

@Component({
    selector: 'app-repair-update',
    templateUrl: './repair-update.component.html',
    styleUrls: ['./repair-update.component.scss', '../repair-dashboard.component.scss'],
})
export class RepairUpdateComponent implements OnInit {
    public repair: Repair;
    public statusHistory = new CollectionView([]);

    public editDevice: boolean = false;

    public repairStatusFields: FieldSettingsModel = { text: 'description', value: 'id' };

    public useSecondaryPaymentMethod: boolean = false;
    public hasRegisteredPayments: boolean = false;
    public hasFinishedStatus: boolean = false;
    public ignoredPaymentRegistrationNotification: boolean = false;
    public showPaymentFields: boolean = true;

    columns: { header: string; binding: string; width: string | number }[] = [
        { header: 'Estado', binding: 'status.status', width: '*' },
        { header: 'Cambió', binding: 'updatedAt', width: 110 },
        { header: 'Costo', binding: 'cost', width: 80 },
        { header: 'Precio', binding: 'price', width: 80 },
        { header: 'Nota', binding: 'note', width: '*' },
        { header: 'Usuario', binding: 'user.userName', width: 70 },
    ];

    constructor(
        public location: Location,
        public repairFormHandlerService: RepairFormHandlerService,
        public repairService: RepairService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private repairVoucherGeneratorService: RepairVoucherGeneratorService
    ) {}

    ngOnInit() {
        if (this.route.snapshot.data['repair']) {
            this.repair = this.route.snapshot.data['repair'];

            this.repairFormHandlerService.saved = false;
            this.repairFormHandlerService.customer = { ...this.repair.customer };
            this.repairFormHandlerService.repair = { ...this.repair };
            this.repairFormHandlerService.formGroup = this.repairFormHandlerService.load();
            this.repairFormHandlerService.buildPaymentsFormGroup(
                this.repairFormHandlerService.repair,
                this.repairFormHandlerService.formGroup
            );

            // Payment section of form initial status:
            this.hasRegisteredPayments = this.repair.moneyTransactions.filter((m) => m.amount !== 0).length > 0;
            this.hasFinishedStatus = this.repair.status.id === ERepairStatus.FINISHED_AND_PAID;
            this.showPaymentFields = this.updatePaymentFieldsVisibility(this.repair);

            // Subscribe to...
            this.repairFormHandlerService.repairGroup.statusChanges.subscribe((x) => {
                this.repairFormHandlerService.paymentsGroup.updateValueAndValidity();
            });

            this.repairFormHandlerService.repairGroup.valueChanges.subscribe((repairValue) => {
                this.repairFormHandlerService.assignRepairForm();
                this.showPaymentFields = this.updatePaymentFieldsVisibility(this.repairFormHandlerService.repair);
            });

            this.getHistory();
            this.initControls();
        }
    }

    private updatePaymentFieldsVisibility(repair: Repair): boolean {
        return (
            this.hasRegisteredPayments ||
            (!!repair.price && repair.price !== 0 && repair.status.id === ERepairStatus.FINISHED_AND_PAID)
        );
    }

    private initControls() {
        const paymentsLength = this.repairFormHandlerService.paymentsGroup.length;
        if (paymentsLength > 1) {
            this.useSecondaryPaymentMethod = true;
        }
    }

    private canGenerateReport(): boolean {
        const repair = this.repairFormHandlerService.repair;
        return (
            [
                ERepairStatus.REQUIRES_CUSTOMER_INTERVENTION,
                ERepairStatus.FINISHED_AND_PAID,
                ERepairStatus.IN_BOARD_REPAIR,
            ].includes(repair.status.id) &&
            repair.note &&
            !!repair.price
        );
    }

    public async getHistory() {
        const response = await this.repairService.getHistory(this.repairFormHandlerService.repair.id).toPromise();
        this.statusHistory = new CollectionView([].concat(response));
        const sortDescription = new SortDescription('updatedAt', true);
        this.statusHistory.sortDescriptions.push(sortDescription);
    }

    public print() {
        this.repairVoucherGeneratorService.print(
            this.canGenerateReport(),
            this.repairFormHandlerService.customer,
            this.repairFormHandlerService.repair
        );
    }

    public toggleEditDevice() {
        this.editDevice = !this.editDevice;
    }

    public async update(editDevice) {
        await this.repairFormHandlerService.update(editDevice);
        await this.getHistory();
    }

    public onStatusChange(event: ChangeEventArgs) {
        this.hasFinishedStatus = event.value === ERepairStatus.FINISHED_AND_PAID;
        this.ignoredPaymentRegistrationNotification =
            event.value !== ERepairStatus.FINISHED_AND_PAID && this.repairFormHandlerService.paymentsGroup.touched;
    }

    public toggleSecondaryPaymentMethod(event: ChangeEventArgsButton) {
        this.useSecondaryPaymentMethod = event.checked;
        if (event.checked) {
            const form = this.formBuilder.group({
                id: [null],
                paymentMethod: [EPaymentMethod.CASH],
                amount: [0],
            });
            this.repairFormHandlerService.paymentsGroup.push(form);
        } else {
            const paymentsLength = this.repairFormHandlerService.paymentsGroup.length;
            this.repairFormHandlerService.paymentsGroup.removeAt(paymentsLength - 1);
        }
    }

    public ignoredPaymentsNotification(): boolean {
        console.log(this.repairFormHandlerService.repairControl.values);
        return true;
    }
}

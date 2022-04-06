import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RepairFormHandlerService } from '@management-view/repair-dashboard/repair-form-handler.service';
import { RepairService } from '@services/repair.service';
import { RepairVoucherGeneratorService } from '@management-view/repair-dashboard/repair-voucher-generator.service';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { Repair, RepairStatus, RepairStatusHistory } from '@models/repair';
import { ChangeEventArgs, FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';
import { FormBuilder } from '@angular/forms';
import { ERepairStatus } from '@enums/repair-status.enum';
import { EPaymentMethod } from '@enums/payment-methods.enum';
import * as _ from 'lodash';
import { isFinishedStatus } from '@functions/repair.functions';

@Component({
    selector: 'app-repair-update',
    templateUrl: './repair-update.component.html',
    styleUrls: ['./repair-update.component.scss', '../repair-dashboard.component.scss'],
})
export class RepairUpdateComponent implements OnInit {
    public deviceTypeFields: FieldSettingsModel = { text: 'description', value: 'id' };

    public repair: Repair;
    public statusHistory = new CollectionView([]);

    public editDevice: boolean = false;

    public repairStatusFields: FieldSettingsModel = { text: 'description', value: 'id' };

    public useSecondaryPaymentMethod: boolean = false;
    public hasRegisteredPayments: boolean = false;
    public hasFinishedStatus: boolean = false;
    public ignoredPaymentRegistrationNotification: boolean = false;

    public highlightedStatuses: RepairStatus[] = [];

    columns: { header: string; binding: string; width: string | number }[] = [
        { header: 'Estado', binding: 'status.description', width: '*' },
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

    async ngOnInit() {
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
            this.hasFinishedStatus = isFinishedStatus(this.repair.status.id);

            // Subscribe to...
            this.repairFormHandlerService.repairGroup.statusChanges.subscribe(() => {
                this.repairFormHandlerService.paymentsGroup.updateValueAndValidity();
            });

            this.repairFormHandlerService.repairGroup.valueChanges.subscribe(() => {
                this.repairFormHandlerService.assignRepairForm();
            });

            await this.getHistory();

            // Grab statuses to highlight in the UI, to let the user know if a repair has been re-entered
            this.highlightedStatuses = _.uniqBy(
                this.repair.history
                    .filter((rhs: RepairStatusHistory) =>
                        [ERepairStatus.REENTERED, ERepairStatus.REENTERED_WITH_WARRANTY].includes(rhs.status.id)
                    )
                    .map((x) => x.status),
                'id'
            );

            this.initControls();
        }
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
        this.repair.history = response;
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
        this.hasFinishedStatus = isFinishedStatus(event.value as number);
        this.ignoredPaymentRegistrationNotification =
            !isFinishedStatus(event.value as number) && this.repairFormHandlerService.paymentsGroup.touched;
    }

    public addRelatedMoneyTransaction() {
        const form = this.formBuilder.group({
            id: [null],
            paymentMethod: [EPaymentMethod.CASH],
            amount: [0],
        });
        this.repairFormHandlerService.paymentsGroup.push(form);
    }

    public removeRelatedMoneyTransaction(event: { index: number }) {
        this.repairFormHandlerService.paymentsGroup.removeAt(event.index);
    }
}

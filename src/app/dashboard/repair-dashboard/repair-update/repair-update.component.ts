import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RepairFormHandlerService } from '@app/dashboard/repair-dashboard/repair-form-handler.service';
import { Repair } from '@app/_models';
import { RepairService } from '@app/_services/repair.service';
import { RepairVoucherGeneratorService } from '@app/dashboard/repair-dashboard/repair-voucher-generator.service';

@Component({
    selector: 'app-repair-update',
    templateUrl: './repair-update.component.html',
    styleUrls: ['./repair-update.component.scss', '../repair-dashboard.component.scss'],
})
export class RepairUpdateComponent implements OnInit, OnDestroy {
    public repair: Repair;
    public statusHistory = [];

    public editDevice: boolean = false;

    columns: any[] = [
        { header: 'Estados Anteriores', binding: 'status.status', width: '*' },
        { header: 'Fecha de modificación', binding: 'updatedAt', width: '*' },
    ];

    constructor(
        public location: Location,
        public repairFormHandlerService: RepairFormHandlerService,
        public repairService: RepairService,
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
            this.getHistory();
        }
    }

    ngOnDestroy(): void {
        this.repairFormHandlerService.registerPayment = false;
    }

    private canGenerateReport(): boolean {
        const repair = this.repairFormHandlerService.repair;
        return [4, 5, 8].includes(repair.status.id) && repair.note && !!repair.price;
    }

    public async getHistory() {
        const response = await this.repairService.getHistory(this.repairFormHandlerService.repair.id).toPromise();
        this.statusHistory = [].concat(response);
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
}

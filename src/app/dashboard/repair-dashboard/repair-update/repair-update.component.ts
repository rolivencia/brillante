import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { Location } from '@angular/common';
import { RepairFormHandlerService } from '@app/dashboard/repair-dashboard/repair-form-handler.service';
import { RepairLegacy } from '@app/_models';
import { RepairService } from '@app/_services/repair.service';
import { ToastrService } from 'ngx-toastr';
import { RepairVoucherGeneratorService } from '@app/dashboard/repair-dashboard/repair-voucher-generator.service';

@Component({
    selector: 'app-repair-update',
    templateUrl: './repair-update.component.html',
    styleUrls: ['./repair-update.component.scss', '../repair-dashboard.component.scss']
})
export class RepairUpdateComponent implements OnInit {
    public repairLegacy: RepairLegacy;
    public statusHistory = [];

    public editDevice: boolean = false;

    columns: any[] = [
        { header: 'Estados Anteriores', binding: 'status.status', width: '*' },
        { header: 'Fecha de modificación', binding: 'updatedAt', width: '*' }
    ];

    constructor(
        public location: Location,
        private legacyMapperService: LegacyMapperService,
        public repairFormHandlerService: RepairFormHandlerService,
        public repairService: RepairService,
        private route: ActivatedRoute,
        private repairVoucherGeneratorService: RepairVoucherGeneratorService
    ) {}

    ngOnInit() {
        if (this.route.snapshot.data['legacyRepair']) {
            this.repairLegacy = this.route.snapshot.data['legacyRepair'];
            this.repairFormHandlerService.saved = false;
            this.repairFormHandlerService.customer = this.legacyMapperService.extractCustomerFromLegacyRepair(this.repairLegacy);
            this.repairFormHandlerService.repair = this.legacyMapperService.fromLegacyRepair(this.repairLegacy);
            this.repairFormHandlerService.formGroup = this.repairFormHandlerService.load();
            this.getHistory();
        }
    }

    private canGenerateReport(): boolean {
        const repair = this.repairFormHandlerService.repair;
        return [4, 5, 8].includes(repair.status.id) && repair.note && !!repair.price;
    }

    public canRegisterPayment(): boolean {
        const newStatus = this.repairFormHandlerService.repairControl['status']['value'];
        return newStatus.id !== 5;
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
}

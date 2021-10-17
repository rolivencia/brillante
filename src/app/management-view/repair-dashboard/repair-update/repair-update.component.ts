import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { RepairFormHandlerService } from '@management-view/repair-dashboard/repair-form-handler.service';
import { RepairService } from '@services/repair.service';
import { RepairVoucherGeneratorService } from '@management-view/repair-dashboard/repair-voucher-generator.service';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { Repair } from '@models/repair';

@Component({
    selector: 'app-repair-update',
    templateUrl: './repair-update.component.html',
    styleUrls: ['./repair-update.component.scss', '../repair-dashboard.component.scss'],
})
export class RepairUpdateComponent implements OnInit, OnDestroy {
    public repair: Repair;
    public statusHistory = new CollectionView([]);

    public editDevice: boolean = false;

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
}

import { Component, OnInit } from '@angular/core';
import { CustomerService } from '@services/customer.service';
import { RepairService } from '@services/repair.service';
import { CollectionView } from '@grapecity/wijmo';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Repair } from '@models/repair';
import { PageService, PageSettingsModel, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { Customer } from '@models/customer';

@Component({
    selector: 'app-client-dashboard',
    templateUrl: './client-dashboard.component.html',
    styleUrls: ['./client-dashboard.component.scss'],
    providers: [PageService],
})
export class ClientDashboardComponent implements OnInit {
    selectedRepairData: Repair;
    public customerGridData: Customer[] = [];
    repairGridData: any;
    repairGridCollection: CollectionView;

    pageSettings: PageSettingsModel = { pageSize: 30 };

    private _selectedClientData: any = null;

    repairColumns: any[] = [
        { header: 'ID', binding: 'id', width: 50 },
        { header: 'Marca', binding: 'device.manufacturer', width: '*' },
        { header: 'Modelo', binding: 'device.model', width: '*' },
        { header: 'Última Act.', binding: 'lastUpdate', width: '*' },
        { header: 'Estado', binding: 'status.description', width: '*' },
    ];

    constructor(
        private clientService: CustomerService,
        private repairService: RepairService,
        private progressLoaderService: ProgressLoaderService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getGridData();
    }

    getClientDetails(event: RowSelectEventArgs) {
        this._selectedClientData = event.data;
        this.repairGridCollection = null;
        if (this._selectedClientData) {
            this.getUserRepairs(this._selectedClientData);
        }
    }

    get selectedClientData() {
        return this._selectedClientData;
    }

    update(clientData: any) {
        // TODO: Implementar método
        alert('Funcionalidad no implementada');
    }

    delete(clientData: any) {
        // TODO: Implementar método
        alert('Funcionalidad no implementada');
    }

    getRepairDetails(item) {
        this.selectedRepairData = item;
    }

    goToUpdate(repair: Repair) {
        this.router.navigate([
            'repair-dashboard/manage',
            { outlets: { top: 'update/' + repair.id, left: null, right: null } },
        ]);
    }

    getGridData() {
        this.progressLoaderService.showWithOverlay();
        this.clientService.getAll().subscribe(
            (data) => {
                this.customerGridData = data.rows.map((customer) => ({
                    ...customer,
                    birthDate: customer.birthDate ? moment(customer.birthDate).format('YYYY-MM-DD') : null,
                }));
                this.progressLoaderService.hide();
            },
            (error) => {
                console.error(error);
                this.progressLoaderService.show();
            }
        );
    }

    private getUserRepairs(clientData: any) {
        this.repairService.getByClientId(clientData.id).subscribe(
            (data) => {
                this.repairGridData = data;
                this.repairGridCollection = new CollectionView(this.repairGridData);
                this.repairGridCollection.currentItem = this.repairGridCollection.items[0];
                this.getRepairDetails(this.repairGridCollection.currentItem);
            },
            (error) => console.error(error)
        );
    }
}

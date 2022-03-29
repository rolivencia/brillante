import { Component, OnInit } from '@angular/core';
import { CustomerService } from '@services/customer.service';
import { RepairService } from '@services/repair.service';
import { CollectionView } from '@grapecity/wijmo';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Repair } from '@models/repair';

@Component({
    selector: 'app-client-dashboard',
    templateUrl: './client-dashboard.component.html',
    styleUrls: ['./client-dashboard.component.scss'],
})
export class ClientDashboardComponent implements OnInit {
    selectedRepairData: Repair;
    clientGridData: any;
    repairGridData: any;
    clientGridCollection: CollectionView;
    repairGridCollection: CollectionView;
    pageSize = 22;

    private _selectedClientData: any = null;

    clientColumns: any[] = [
        { header: 'ID', binding: 'id', width: 50 },
        { header: 'DNI', binding: 'dni', width: '*' },
        { header: 'Nombre', binding: 'firstName', width: '*' },
        { header: 'Apellido', binding: 'lastName', width: '*' },
        { header: 'Natalicio', binding: 'birthDate', width: '*' },
    ];

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

    getClientDetails(item) {
        this._selectedClientData = item;
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
                this.clientGridData = data.rows.map((customer) => ({
                    ...customer,
                    birthDate: customer.birthDate ? moment(customer.birthDate).format('YYYY-MM-DD') : null,
                }));
                this.clientGridCollection = new CollectionView(this.clientGridData);
                this.clientGridCollection.pageSize = this.pageSize;
                this.clientGridCollection.currentItem = null;
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

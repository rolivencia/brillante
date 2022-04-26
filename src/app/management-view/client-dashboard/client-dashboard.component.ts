import { Component, OnInit } from '@angular/core';
import { CustomerService } from '@services/customer.service';
import { RepairService } from '@services/repair.service';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Repair } from '@models/repair';
import { PageService, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { Customer } from '@models/customer';
import { routePaths } from '../../app.routing';

@Component({
    selector: 'app-client-dashboard',
    templateUrl: './client-dashboard.component.html',
    styleUrls: ['./client-dashboard.component.scss'],
    providers: [PageService],
})
export class ClientDashboardComponent implements OnInit {
    get selectedClientData() {
        return this._selectedClientData;
    }

    public selectedRepairData: Repair;
    public customerGridData: Customer[] = [];
    public repairGridData: Repair[] = [];

    private _selectedClientData: any = null;

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
        if (this._selectedClientData) {
            this.getUserRepairs(this._selectedClientData);
        }
    }

    public goToCustomerUpdate(clientData: any) {
        this.router.navigate(['client-dashboard/update/' + clientData.id]);
    }

    public delete(clientData: any) {
        // TODO: Implementar método
        alert('Funcionalidad no implementada');
    }

    public getRepairDetails(item) {
        this.selectedRepairData = item;
    }

    public goToUpdate() {
        this.router.navigate([
            routePaths.repair.path,
            { outlets: { top: 'update/' + this.selectedRepairData.id, left: null, right: null } },
        ]);
    }

    public getGridData() {
        this.progressLoaderService.showWithOverlay();
        this.clientService.getAll().subscribe(
            (data) => {
                this.customerGridData = data.map((customer) => ({
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
            },
            (error) => console.error(error)
        );
    }
}

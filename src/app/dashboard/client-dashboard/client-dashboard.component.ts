import { Component, OnInit } from '@angular/core';
import { CustomerService } from '@app/_services/customer.service';
import { RepairService } from '@app/_services/repair.service';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { RepairLegacy } from '@app/_models';
import { GlobalService } from '@app/_services/global.service';

@Component({
    selector: 'app-client-dashboard',
    templateUrl: './client-dashboard.component.html',
    styleUrls: ['./client-dashboard.component.scss'],
})
export class ClientDashboardComponent implements OnInit {
    // _selectedClientData: ClientLegacy;

    selectedRepairData: RepairLegacy;
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
        { header: 'eMail', binding: 'email', width: '*' },
        { header: 'Dirección', binding: 'address', width: '*' },
    ];

    repairColumns: any[] = [
        { header: 'ID', binding: 'repairId', width: 50 },
        { header: 'Marca', binding: 'marca', width: '*' },
        { header: 'Modelo', binding: 'modelo', width: '*' },
        { header: 'Última Act.', binding: 'fechaUltimaActualizacion', width: '*' },
        { header: 'Estado', binding: 'estado', width: '*' },
    ];

    constructor(private clientService: CustomerService, private repairService: RepairService, private globalService: GlobalService) {}

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

    // FIXME: Update to internal link after the update is migrated to Angular app
    goToUpdate(repairId: number) {
        const redirectTo = `${this.globalService.legacySiteUrl}/fix-vista-de-actualizacion/?repairId=${repairId}`;
        window.open(redirectTo, 'blank');
    }

    getGridData() {
        this.clientService.getAll().subscribe(
            (data) => {
                this.clientGridData = data;
                this.clientGridCollection = new CollectionView(this.clientGridData);
                this.clientGridCollection.pageSize = this.pageSize;
                this.clientGridCollection.currentItem = null;
            },
            (error) => console.error(error)
        );
    }

    private getUserRepairs(clientData: any) {
        this.repairService.getByClientIdLegacy(clientData.id).subscribe(
            (data) => {
                this.repairGridData = data;
                this.repairGridCollection = new CollectionView(this.repairGridData.data);
                this.repairGridCollection.currentItem = this.repairGridCollection.items[0];
                this.getRepairDetails(this.repairGridCollection.currentItem);
            },
            (error) => console.error(error)
        );
    }
}

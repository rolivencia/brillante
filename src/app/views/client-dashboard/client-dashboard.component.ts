import {Component, OnInit} from '@angular/core';
import {ClientService} from '@app/_services/client.service';
import {RepairService} from '@app/_services/repair.service';
import {CollectionView, SortDescription} from 'wijmo/wijmo';
import {RepairLegacy} from '@app/_models';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  // selectedClientData: ClientLegacy;
  selectedClientData: any;
  selectedRepairData: RepairLegacy;
  clientGridData: any;
  repairGridData: any;
  clientGridCollection: CollectionView;
  repairGridCollection: CollectionView;
  pageSize = 22;

  clientColumns: any[] = [
    { header: 'ID', binding: 'personId', width: 50},
    { header: 'DNI', binding: 'dni', width: '*'},
    { header: 'Nombre', binding: 'firstName', width: '*'},
    { header: 'Apellido', binding: 'lastName', width: '*'},
    { header: 'eMail', binding: 'email', width: '*'},
    { header: 'Dirección', binding: 'address', width: '*'}
  ];

  repairColumns: any[] = [
    { header: 'ID', binding: 'repairId', width: 50},
    { header: 'Marca', binding: 'marca', width: '*'},
    { header: 'Modelo', binding: 'modelo', width: '*'},
    { header: 'Última Act.', binding: 'fechaUltimaActualizacion', width: '*'},
    { header: 'Estado', binding: 'estado', width: '*'}
  ];

  constructor(private clientService: ClientService, private repairService: RepairService) {

  }

  ngOnInit() {
    this.getGridData();
  }

  getClientDetails(item) {
    this.selectedClientData = item;
    this.repairGridCollection = null;
    if (this.selectedClientData) {
      this.getUserRepairs(this.selectedClientData);
    }
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
    const redirectTo = 'http://brillante.rolivencia.xyz/fix-vista-de-actualizacion/?repairId=' + repairId;
    window.open(redirectTo, 'blank');
  }

  getGridData() {
    this.clientService.getAllLegacy().subscribe(
      data => {
        this.clientGridData = data;
        this.clientGridCollection = new CollectionView(this.clientGridData.data);
        this.clientGridCollection.pageSize = this.pageSize;
        this.clientGridCollection.currentItem = null;
      },
      error => console.error(error)
    );
  }

  private getUserRepairs(clientData: any) {
    this.repairService.getByClientIdLegacy(clientData.personId).subscribe(
      data => {
        this.repairGridData = data;
        this.repairGridCollection = new CollectionView(this.repairGridData.data);
        this.repairGridCollection.currentItem = this.repairGridCollection.items[0];
        this.getRepairDetails(this.repairGridCollection.currentItem);
      },
      error => console.error(error)
    );
  }

}

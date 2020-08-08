import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairService } from '@app/_services/repair.service';
import { DateObject } from '@app/_models/date-object';
import { DateHandlerService } from '@app/_services/date-handler.service';

@Component({
    selector: 'app-repair-grid-results',
    templateUrl: './repair-grid-results.component.html',
    styleUrls: ['./repair-grid-results.component.scss', '../repair-dashboard.component.scss'],
})
export class RepairGridResultsComponent implements OnInit {
    constructor(
        private dateHandlerService: DateHandlerService,
        private repairService: RepairService,
        public repairDashboardService: RepairDashboardService
    ) {}

    columns: any[] = [
        { header: 'ID', binding: 'repairId', width: 50 },
        { header: 'Cliente', binding: 'nombreApellidoCliente', width: '*' },
        { header: 'Marca', binding: 'marca', width: 110 },
        { header: 'Modelo', binding: 'modelo', width: '*' },
        { header: 'IMEI', binding: 'imei', width: '*' },
        { header: 'Última Act.', binding: 'fechaUltimaActualizacion', width: '*' },
        { header: 'Estado', binding: 'estado', width: '*' },
    ];

    displayMonths = 1;
    navigation = 'select';
    outsideDays = 'visible';

    ngOnInit() {
        this.repairDashboardService._dateTo = moment();
        this.repairDashboardService._dateFrom = moment().subtract(1, 'month');

        this.repairDashboardService.ngbDateTo = this.dateHandlerService.formatMomentToObject(this.repairDashboardService._dateTo);
        this.repairDashboardService.ngbDateFrom = this.dateHandlerService.formatMomentToObject(this.repairDashboardService._dateFrom);
        this.repairDashboardService.ngbMaxDate = this.dateHandlerService.formatMomentToObject(this.repairDashboardService._dateTo);

        this.repairDashboardService.getGridData();
    }

    //FIXME: Move this methods to a service
    formatDate(date: DateObject, fromOrTo: string) {
        const dateString = `${date.year}-${date.month}-${date.day}`;

        if (fromOrTo === 'from') {
            this.repairDashboardService._dateFrom = moment(dateString);
        }
        if (fromOrTo === 'to') {
            this.repairDashboardService._dateTo = moment(dateString);
        }
    }

    getRepairDetails(item) {
        this.repairDashboardService.selectedRepair = item;
    }
}

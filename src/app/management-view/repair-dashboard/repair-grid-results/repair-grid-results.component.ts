import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { RepairDashboardService } from '@management-view/repair-dashboard/repair-dashboard.service';
import { DateObject } from '@models/date-object';
import { DateHandlerService } from '@services/date-handler.service';

@Component({
    selector: 'app-repair-grid-results',
    templateUrl: './repair-grid-results.component.html',
    styleUrls: ['./repair-grid-results.component.scss', '../repair-dashboard.component.scss'],
})
export class RepairGridResultsComponent implements OnInit {
    constructor(
        private dateHandlerService: DateHandlerService,
        public repairDashboardService: RepairDashboardService
    ) {}

    columns: any[] = [
        { header: 'ID', binding: 'id', width: 50 },
        { header: 'Cliente', binding: 'customer.fullName', width: '*' },
        { header: 'Marca', binding: 'device.manufacturer', width: 100 },
        { header: 'Modelo', binding: 'device.model', width: '*' },
        // { header: 'IMEI', binding: 'device.deviceId', width: '*' },
        { header: 'Última Act.', binding: 'lastUpdate', width: '*' },
        { header: 'Estado', binding: 'status.status', width: '*' },
    ];

    displayMonths = 1;
    navigation = 'select';
    outsideDays = 'visible';

    ngOnInit() {
        this.repairDashboardService._dateTo = moment();
        this.repairDashboardService._dateFrom = moment().subtract(1, 'month');

        this.repairDashboardService.ngbDateTo = this.dateHandlerService.formatMomentToObject(
            this.repairDashboardService._dateTo
        );
        this.repairDashboardService.ngbDateFrom = this.dateHandlerService.formatMomentToObject(
            this.repairDashboardService._dateFrom
        );
        this.repairDashboardService.ngbMaxDate = this.dateHandlerService.formatMomentToObject(
            this.repairDashboardService._dateTo
        );

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

import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairService } from '@app/_services/repair.service';

@Component({
    selector: 'app-repair-grid-results',
    templateUrl: './repair-grid-results.component.html',
    styleUrls: ['./repair-grid-results.component.scss', '../repair-dashboard.component.scss']
})
export class RepairGridResultsComponent implements OnInit {
    constructor(private repairService: RepairService, public repairDashboardService: RepairDashboardService) {}

    columns: any[] = [
        { header: 'ID', binding: 'repairId', width: 50 },
        { header: 'Cliente', binding: 'nombreApellidoCliente', width: '*' },
        { header: 'Marca', binding: 'marca', width: 110 },
        { header: 'Modelo', binding: 'modelo', width: '*' },
        { header: 'IMEI', binding: 'imei', width: '*' },
        { header: 'Última Act.', binding: 'fechaUltimaActualizacion', width: '*' },
        { header: 'Estado', binding: 'estado', width: '*' }
    ];

    displayMonths = 1;
    navigation = 'select';
    showWeekNumbers = false;
    outsideDays = 'visible';

    ngOnInit() {
        this.repairDashboardService._dateTo = moment();
        this.repairDashboardService._dateFrom = moment().subtract(1, 'month');

        this.repairDashboardService.ngbDateTo = this.formatMomentToObject(this.repairDashboardService._dateTo);
        this.repairDashboardService.ngbDateFrom = this.formatMomentToObject(this.repairDashboardService._dateFrom);
        this.repairDashboardService.ngbMaxDate = this.formatMomentToObject(this.repairDashboardService._dateTo);

        this.repairDashboardService.getGridData();
    }

    formatDate(date: DateObject, fromOrTo: string) {
        const dateString = `${date.year}-${date.month}-${date.day}`;

        if (fromOrTo === 'from') {
            this.repairDashboardService._dateFrom = moment(dateString);
        }
        if (fromOrTo === 'to') {
            this.repairDashboardService._dateTo = moment(dateString);
        }
    }

    formatMomentToObject(momentDate: Moment): DateObject {
        return {
            year: momentDate.get('year'),
            month: momentDate.get('month') + 1,
            day: momentDate.get('date')
        };
    }

    getRepairDetails(item) {
        this.repairDashboardService.selectedRepair = item;
    }
}

export class DateObject {
    year: number;
    month: number;
    day: number;
}

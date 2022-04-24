import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { RepairDashboardService } from '@management-view/repair-dashboard/repair-dashboard.service';
import { DateObject } from '@models/date-object';
import { DateHandlerService } from '@services/date-handler.service';
import {
    FilterService,
    PageService,
    RowSelectEventArgs,
    SortService,
    SortSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { Repair } from '@models/repair';

@Component({
    selector: 'app-repair-grid-results',
    templateUrl: './repair-grid-results.component.html',
    styleUrls: ['./repair-grid-results.component.scss', '../repair-dashboard.component.scss'],
    providers: [FilterService, PageService, SortService],
})
export class RepairGridResultsComponent implements OnInit {
    constructor(
        private dateHandlerService: DateHandlerService,
        public repairDashboardService: RepairDashboardService
    ) {}

    public displayMonths = 1;
    public navigation = 'select';
    public outsideDays = 'visible';
    public sortOptions: SortSettingsModel = {
        columns: [{ field: 'lastUpdate', direction: 'Descending' }],
    };

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

    getRepairDetails(event: RowSelectEventArgs) {
        this.repairDashboardService.selectedRepair = event.data as Repair;
    }
}

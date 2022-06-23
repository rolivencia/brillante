import * as moment from 'moment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RepairDashboardService } from '@management-view/repair-dashboard/repair-dashboard.service';
import { DateObject } from '@models/date-object';
import { DateHandlerService } from '@services/date-handler.service';
import {
    FilterService,
    GridComponent,
    PageService,
    RowSelectEventArgs,
    SortService,
    SortSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { Repair } from '@models/repair';
import { DataUtil } from '@syncfusion/ej2-data';

@Component({
    selector: 'app-repair-grid-results',
    templateUrl: './repair-grid-results.component.html',
    styleUrls: ['./repair-grid-results.component.scss', '../repair-manage.component.scss'],
    providers: [FilterService, PageService, SortService],
})
export class RepairGridResultsComponent implements OnInit {
    @ViewChild('grid', { static: false }) grid: GridComponent;

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

    public filterDropdownData = { manufacturer: [], model: [], status: [] };

    async ngOnInit() {
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

        await this.repairDashboardService.getGridData();
        this.filterDropdownData = {
            manufacturer: ['']
                .concat(DataUtil.distinct(this.repairDashboardService.gridData, 'device.manufacturer') as string[])
                .sort(),
            model: ['']
                .concat(DataUtil.distinct(this.repairDashboardService.gridData, 'device.model') as string[])
                .sort(),
            status: ['']
                .concat(DataUtil.distinct(this.repairDashboardService.gridData, 'status.description') as string[])
                .sort(),
        };
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

    public onFilterChange(args: any, field: string): void {
        if (args.value === '') {
            this.grid.clearFiltering([field]);
        } else {
            this.grid.filterByColumn(field, 'equal', args.value);
        }
    }
}

import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RepairDashboardService } from '@pages/repair-dashboard/repair-dashboard.service';
import { DateObject } from '@models/date-object';
import {
    FilterService,
    GridComponent,
    PageService,
    RowSelectEventArgs,
    SortService,
    SortSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { Repair } from '@models/repair';
import { RepairService } from '@services/repair.service';
import { subMonths, parseISO } from 'date-fns';
import { DateTimeService } from '@services/date-time.service';

@Component({
    selector: 'app-repair-grid-results',
    templateUrl: './repair-grid-results.component.html',
    styleUrls: ['./repair-grid-results.component.scss', '../repair-manage.component.scss'],
    providers: [FilterService, PageService, SortService],
    standalone: false,
})
export class RepairGridResultsComponent implements OnInit {
    @ViewChild('grid', { static: false }) grid: GridComponent;

    private dateTimeService = inject(DateTimeService);

    constructor(private repairService: RepairService, public repairDashboardService: RepairDashboardService) {}

    public displayMonths = 1;
    public navigation = 'select';
    public outsideDays = 'visible';
    public sortOptions: SortSettingsModel = {
        columns: [{ field: 'lastUpdate', direction: 'Descending' }],
    };

    public filterDropdownData = { status: [] };

    async ngOnInit() {
        this.repairDashboardService._dateTo = new Date();
        this.repairDashboardService._dateFrom = subMonths(new Date(), 1);

        this.repairDashboardService.ngbDateTo = this.dateTimeService.formatDateToObject(
            this.repairDashboardService._dateTo
        );
        this.repairDashboardService.ngbDateFrom = this.dateTimeService.formatDateToObject(
            this.repairDashboardService._dateFrom
        );
        this.repairDashboardService.ngbMaxDate = this.dateTimeService.formatDateToObject(
            this.repairDashboardService._dateTo
        );

        await this.repairDashboardService.getGridData();
        this.filterDropdownData = {
            status: this.repairService.repairStatuses.map((status) => status.description).sort(),
        };
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

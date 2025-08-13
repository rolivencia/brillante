import { CashDashboardService, formatDate } from '@pages/cash-dashboard/cash-dashboard.service';
import { CashReportService } from '@pages/reports-dashboard/cash-report/cash-report.service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateObject } from '@models/date-object';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from '@services/layout.service';
import { GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { getYear, getMonth, getDate, format } from 'date-fns';

@Component({
    selector: 'app-cash-report',
    templateUrl: './cash-report.component.html',
    styleUrls: ['./cash-report.component.scss'],
    standalone: false,
})
export class CashReportComponent implements OnInit, AfterViewInit, OnDestroy {
    loading: boolean = false;
    private loadingSubscription: Subscription;

    //TODO: Refactor these variables to the dashboard service
    displayMonths = 1;
    navigation = 'select';
    outsideDays = 'visible';

    public gridHeight: string;
    public sortOptions: object;
    public fields: object = { text: 'Sucursal', value: 'id' };
    public filterDropdownData = { officeBranch: [], paymentMethod: [], user: [] };
    public toolbarOptions: ToolbarItems[];

    @ViewChild('gridContainer') gridContainer: ElementRef;
    @ViewChild('cashGrid', { static: false }) cashGrid: GridComponent;

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashReportService: CashReportService, // Dot not remove. Will be used in the future.
        private changeDetectorRef: ChangeDetectorRef,
        private layoutService: LayoutService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.toolbarOptions = ['ExcelExport'];
        this.loadingSubscription = this.cashDashboardService.loading.subscribe((result) => {
            this.loading = result;
            this.changeDetectorRef.detectChanges();
        });
        this.cashDashboardService.ngbDateFrom = {
            year: getYear(new Date()),
            month: getMonth(new Date()) + 1,
            day: getDate(new Date()),
        };
        this.cashDashboardService.ngbDateTo = {
            year: getYear(new Date()),
            month: (getMonth(new Date()) + 1) % 13,
            day: getDate(new Date()),
        };
        this.refreshGrid(this.cashDashboardService.ngbDateFrom, this.cashDashboardService.ngbDateTo);

        this.layoutService.useContainer.next(false);
    }

    ngOnDestroy(): void {
        this.cashDashboardService.setTodayDate();
        this.loadingSubscription.unsubscribe();
        this.loading = false;
    }

    ngAfterViewInit(): void {
        // this.calculateGridHeight();
    }

    async refreshGrid(fromNgb: DateObject, toNgb: DateObject) {
        const from = formatDate(fromNgb);
        const to = formatDate(toNgb);
        await this.cashDashboardService.loadData(from, to, [49, 163]);
        this.cashDashboardService.selectedTransaction = null;
        this.filterDropdownData = {
            officeBranch: [''].concat(
                DataUtil.distinct(this.cashDashboardService.gridData, 'officeBranch.name') as string[]
            ),
            paymentMethod: [''].concat(
                DataUtil.distinct(this.cashDashboardService.gridData, 'paymentMethod.description') as string[]
            ),
            user: [''].concat(
                DataUtil.distinct(this.cashDashboardService.gridData, 'audit.createdBy.userName') as string[]
            ),
        };
        this.sortOptions = {
            columns: [{ field: 'id', direction: 'Ascending' }],
        };
        this.calculateGridHeight();
    }

    //TODO: Migrate to SyncFusion version
    public exportToXls() {
        const from = format(formatDate(this.cashDashboardService.ngbDateFrom), 'yyyy-MM-dd');
        const to = format(formatDate(this.cashDashboardService.ngbDateTo), 'yyyy-MM-dd');
        this.cashGrid.excelExport({ fileName: `Reporte Monetario Brillante (${from} - ${to}).xlsx` });
    }

    public back() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }]);
    }

    public onChange(args: any, field: string): void {
        if (args.value === '') {
            this.cashGrid.clearFiltering([field]);
        } else {
            this.cashGrid.filterByColumn(field, 'equal', args.value);
        }
    }

    private calculateGridHeight() {
        if (this.cashGrid) {
            const headerHeight = 42;
            const filterRowHeight = 45;
            const footerHeight = 27;
            const containerPadding = parseFloat(
                window.getComputedStyle(this.gridContainer.nativeElement).padding.slice(0, -2)
            );
            this.gridHeight =
                this.gridContainer.nativeElement.offsetHeight -
                headerHeight -
                filterRowHeight -
                footerHeight -
                2 * containerPadding +
                'px';
        }
    }
}

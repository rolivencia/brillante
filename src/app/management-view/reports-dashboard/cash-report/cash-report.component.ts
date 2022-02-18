import * as moment from 'moment';
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx';
import { CashDashboardService, formatDate } from '@management-view/cash-dashboard/cash-dashboard.service';
import { CashReportService } from '@management-view/reports-dashboard/cash-report/cash-report.service';
import { CellType } from '@grapecity/wijmo.grid';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateObject } from '@models/date-object';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from '@services/layout.service';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';

@Component({
    selector: 'app-cash-report',
    templateUrl: './cash-report.component.html',
    styleUrls: ['./cash-report.component.scss'],
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
    public dropData = ({} = DataUtil.distinct(this.cashDashboardService.gridData, 'officeBranch.name') as string[]);

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
        this.loadingSubscription = this.cashDashboardService.loading.subscribe((result) => {
            this.loading = result;
            this.changeDetectorRef.detectChanges();
        });
        this.cashDashboardService.ngbDateFrom = {
            year: moment().year(),
            month: moment().month() % 13,
            day: moment().date(),
        };
        this.cashDashboardService.ngbDateTo = {
            year: moment().year(),
            month: (moment().month() + 1) % 13,
            day: moment().date(),
        };
        this.refreshGrid(this.cashDashboardService.ngbDateFrom, this.cashDashboardService.ngbDateTo);
        this.sortOptions = {
            columns: [{ field: 'date', direction: 'Descending' }],
        };

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
        this.dropData = DataUtil.distinct(this.cashDashboardService.gridData, 'officeBranch.name') as string[];
        this.calculateGridHeight();
    }

    //TODO: Migrate to SyncFusion version
    exportToXls() {
        const from = formatDate(this.cashDashboardService.ngbDateFrom).format('YYYY-MM-DD');
        const to = formatDate(this.cashDashboardService.ngbDateTo).format('YYYY-MM-DD');
        wjcGridXlsx.FlexGridXlsxConverter.save(
            this.cashGrid as any,
            {
                includeColumnHeaders: true,
                includeCellStyles: false,
                formatItem: (item) => {
                    if (item.panel.cellType === CellType.ColumnHeader) {
                        item.xlsxCell.style.fill = { color: '#e9ecef' }; //TODO: Generalize color - Select from service
                    }
                    if (item.panel.cellType === CellType.Cell && item.col === 7) {
                        item.xlsxCell.value = moment(item.xlsxCell.value).format('YYYY/MM/DD HH:mm');
                    }
                    if (item.panel.cellType === CellType.ColumnFooter && !isNaN(item.xlsxCell.value)) {
                        if (item.col === 6) {
                            item.xlsxCell.style.fill = { color: '#d4edda' }; //TODO: Generalize color - Select from service
                        }
                        if (item.col === 5) {
                            item.xlsxCell.style.fill = { color: '#f8d7da' }; //TODO: Generalize color - Select from service
                        }
                        if (item.col === 4) {
                            item.xlsxCell.style.fill = { color: '#d1ecf1' }; //TODO: Generalize color - Select from service
                        }
                    }
                },
            },
            `Reporte Brillante Store (${from} - ${to})`
        );
    }

    back() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }]);
    }

    public onChange(args: any): void {
        this.cashGrid.filterByColumn('officeBranch.name', 'equal', args.value);
    }

    private calculateGridHeight() {
        if (this.cashGrid) {
            const headerHeight = 42;
            const filterRowHeight = 45;
            const containerPadding = parseFloat(
                window.getComputedStyle(this.gridContainer.nativeElement).padding.slice(0, -2)
            );
            this.gridHeight =
                this.gridContainer.nativeElement.offsetHeight -
                headerHeight -
                filterRowHeight -
                2 * containerPadding +
                'px';
        }
    }
}

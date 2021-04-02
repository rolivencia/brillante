import * as moment from 'moment';
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx';
import { CashDashboardService, formatDate } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { CashReportService } from '@app/dashboard/cash-dashboard/cash-report/cash-report.service';
import { CellType } from '@grapecity/wijmo.grid';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DateObject } from '@app/_models/date-object';
import { Router } from '@angular/router';
import { WjFlexGrid } from '@grapecity/wijmo.angular2.grid';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cash-report',
    templateUrl: './cash-report.component.html',
    styleUrls: ['./cash-report.component.scss'],
})
export class CashReportComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    private loadingSubscription: Subscription;

    //TODO: Refactor these variables to the dashboard service
    displayMonths = 1;
    navigation = 'select';
    outsideDays = 'visible';

    @ViewChild('cashGrid', { static: false }) cashGrid: WjFlexGrid;

    columns: any[] = [
        { header: 'ID', binding: 'id', width: 60 },
        { header: 'Concepto', binding: 'concept.parent.description', width: '*' },
        { header: 'Subconcepto', binding: 'concept.description', width: '*' },
        { header: 'Nota', binding: 'note', width: 150 },
        { header: 'Método', binding: 'paymentMethod.description', width: 90 },
        { header: 'Ingreso', binding: 'income', width: 80 },
        { header: 'Egreso', binding: 'expense', width: 80 },
        { header: 'Saldo', binding: 'amount', width: 80 },
        { header: 'Creador', binding: 'audit.createdBy.userName', width: 80 },
        { header: 'Fecha y Hora', binding: 'date', width: 120 },
    ];

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashReportService: CashReportService, // Dot not remove. Will be used in the future.
        private changeDetectorRef: ChangeDetectorRef,
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
    }

    ngOnDestroy(): void {
        this.cashDashboardService.setTodayDate();
        this.loadingSubscription.unsubscribe();
        this.loading = false;
    }

    refreshGrid(fromNgb: DateObject, toNgb: DateObject) {
        const from = formatDate(fromNgb);
        const to = formatDate(toNgb);
        this.cashDashboardService.load(from, to, [49, 163]);
        this.cashDashboardService.selectedTransaction = null;
    }

    exportToXls() {
        const from = formatDate(this.cashDashboardService.ngbDateFrom).format('YYYY-MM-DD');
        const to = formatDate(this.cashDashboardService.ngbDateTo).format('YYYY-MM-DD');
        wjcGridXlsx.FlexGridXlsxConverter.save(
            this.cashGrid,
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
}

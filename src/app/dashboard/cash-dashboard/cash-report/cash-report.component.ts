import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CashReportService } from '@app/dashboard/cash-dashboard/cash-report/cash-report.service';
import { Router } from '@angular/router';
import { CashDashboardService, formatDate } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx';
import { WjFlexGrid } from '@grapecity/wijmo.angular2.grid';

@Component({
    selector: 'app-cash-report',
    templateUrl: './cash-report.component.html',
    styleUrls: ['./cash-report.component.scss'],
})
export class CashReportComponent implements OnInit, OnDestroy {
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
        { header: 'Ingreso', binding: 'income', width: 80 },
        { header: 'Egreso', binding: 'expense', width: 80 },
        { header: 'Saldo', binding: 'amount', width: 80 },
        { header: 'Fecha y Hora', binding: 'date', width: 120 },
    ];

    constructor(public cashDashboardService: CashDashboardService, public cashReportService: CashReportService, private router: Router) {}

    ngOnInit(): void {
        this.cashDashboardService.ngbDateFrom = { year: moment().year(), month: moment().month() % 13, day: moment().date() };
        this.cashDashboardService.ngbDateTo = { year: moment().year(), month: (moment().month() + 1) % 13, day: moment().date() };
    }

    ngOnDestroy(): void {
        this.cashDashboardService.setTodayDate();
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
                    if (item.row !== 0 && item.col === 7) {
                        console.log('ITEM:' + item);
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

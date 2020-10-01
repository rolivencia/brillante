import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashReportService } from '@app/dashboard/cash-dashboard/cash-report/cash-report.service';
import { Router } from '@angular/router';
import { CashDashboardService, formatDate } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';

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

    columns: any[] = [
        { header: 'ID', binding: 'id', width: 60 },
        { header: 'Concepto', binding: 'concept.parent.description', width: '*' },
        { header: 'Subconcepto', binding: 'concept.description', width: '*' },
        { header: 'Ingreso', binding: 'income', width: 80 },
        { header: 'Egreso', binding: 'expense', width: 80 },
        { header: 'Saldo', binding: 'amount', width: 80 },
        { header: 'Hora', binding: 'date', width: 60 },
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
        this.cashDashboardService.load(from, to);
        this.cashDashboardService.selectedTransaction = null;
    }

    exportToXls() {}

    back() {
        this.router.navigate(['cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }]);
    }
}

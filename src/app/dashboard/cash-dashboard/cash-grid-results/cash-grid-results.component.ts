import * as moment from 'moment';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DateObject } from '@app/_models/date-object';
import { FlexGrid } from 'wijmo/wijmo.grid';

@Component({
    selector: 'app-cash-grid-results',
    templateUrl: './cash-grid-results.component.html',
    styleUrls: ['./cash-grid-results.component.scss'],
})
export class CashGridResultsComponent implements OnInit {
    @ViewChild('cashGrid', { static: false }) cashGrid: FlexGrid;

    displayMonths = 1;
    navigation = 'select';
    outsideDays = 'visible';
    editMode: boolean = false;

    columns: any[] = [
        { header: 'ID', binding: 'id', width: 60 },
        { header: 'Concepto', binding: 'concept.parent.description', width: '*' },
        { header: 'Subconcepto', binding: 'concept.description', width: '*' },
        { header: 'Ingreso', binding: 'amount', width: 80 },
        { header: 'Egreso', binding: 'amount', width: 80 },
        { header: 'Hora', binding: 'date', width: 60 },
    ];

    constructor(public cashDashboardService: CashDashboardService, public changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.subscribe((result) => {
            this.editMode = result;
            this.changeDetectorRef.detectChanges();
        });
    }

    //FIXME: Move this method to a service
    formatDate(date: DateObject) {
        const dateString = `${date.year}-${date.month}-${date.day}`;
        this.cashDashboardService.date = moment(dateString);
    }

    //FIXME: Move this method to a service
    setTodayDate() {
        this.cashDashboardService.ngbDate = { year: moment().year(), month: (moment().month() + 1) % 13, day: moment().date() };
        this.refreshGrid(this.cashDashboardService.ngbDate);
    }

    refreshGrid(date: DateObject) {
        this.formatDate(date);
        this.cashDashboardService.load(this.cashDashboardService.date);
        this.cashDashboardService.selectedTransaction = null;
    }

    getRegisterDetails(currentItem) {
        this.cashDashboardService.selectedTransaction = currentItem;
    }
}

import * as moment from 'moment';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateObject } from '@app/_models/date-object';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { CashTransaction } from '@app/_models/cash-transaction';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cash-grid-results',
    templateUrl: './cash-grid-results.component.html',
    styleUrls: ['./cash-grid-results.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CashGridResultsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('cashGrid', { static: false }) cashGrid: FlexGrid;

    displayMonths = 1;
    navigation = 'select';
    outsideDays = 'visible';
    editMode: boolean = false;

    columns: any[] = [
        { header: 'ID', binding: 'id', width: 60 },
        { header: 'Concepto', binding: 'concept.parent.description', width: '*' },
        { header: 'Subconcepto', binding: 'concept.description', width: '*' },
        { header: 'Ingreso', binding: 'income', width: 80 },
        { header: 'Egreso', binding: 'expense', width: 80 },
        { header: 'Saldo', binding: 'amount', width: 80 },
        { header: 'Hora', binding: 'date', width: 60 },
    ];

    constructor(public cashDashboardService: CashDashboardService, private router: Router) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.subscribe((result) => {
            this.editMode = result;
        });
    }

    ngAfterViewInit() {
        this.refreshGrid(this.cashDashboardService.ngbDateFrom);
    }

    ngOnDestroy(): void {
        this.setTodayDate();
    }

    //FIXME: Move this method to a service
    public formatDate(date: DateObject) {
        const dateString = `${date.year}-${date.month}-${date.day}`;
        this.cashDashboardService.date = moment(dateString);
    }

    //FIXME: Move this method to a service
    public setTodayDate() {
        this.cashDashboardService.setTodayDate();
        this.refreshGrid(this.cashDashboardService.ngbDateFrom);
    }

    public refreshGrid(date: DateObject) {
        this.formatDate(date);
        this.cashDashboardService.load(this.cashDashboardService.date);
        this.cashDashboardService.selectedTransaction = null;
    }

    public getRegisterDetails(currentItem: CashTransaction) {
        this.cashDashboardService.selectedTransaction = currentItem;
    }
}

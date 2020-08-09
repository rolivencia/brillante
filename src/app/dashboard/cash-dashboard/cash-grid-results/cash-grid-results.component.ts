import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';
import { FlexGrid } from 'wijmo/wijmo.grid';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';

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

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        public changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.subscribe((result) => {
            this.editMode = result;
            this.changeDetectorRef.detectChanges();
        });
    }

    //FIXME: Move this methods to a service
    formatDate(date: DateObject) {
        const dateString = `${date.year}-${date.month}-${date.day}`;
        this.cashDashboardService.date = moment(dateString);
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

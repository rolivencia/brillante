import { Component, OnInit, ViewChild } from '@angular/core';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';
import { DateHandlerService } from '@app/_services/date-handler.service';
import { FlexGrid } from 'wijmo/wijmo.grid';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';

@Component({
    selector: 'app-cash-dashboard',
    templateUrl: './cash-dashboard.component.html',
    styleUrls: ['./cash-dashboard.component.scss']
})
export class CashDashboardComponent implements OnInit {
    @ViewChild('cashGrid', { static: false }) cashGrid: FlexGrid;
    displayMonths = 1;
    navigation = 'select';
    showWeekNumbers = false;
    outsideDays = 'visible';

    columns: any[] = [
        { header: 'ID', binding: 'id', width: 60 },
        { header: 'Concepto', binding: 'concept.parent.description', width: '*' },
        { header: 'Subconcepto', binding: 'concept.description', width: '*' },
        { header: 'Ingreso', binding: 'amount', width: 80 },
        { header: 'Egreso', binding: 'amount', width: 80 },
        { header: 'Hora', binding: 'date', width: 60 }
    ];

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private dateHandlerService: DateHandlerService
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.ngbDate = this.dateHandlerService.formatMomentToObject(this.cashDashboardService.date);
    }

    refreshGrid(date: DateObject) {
        this.formatDate(date);
        this.cashDashboardService.load(this.cashDashboardService.date);
    }

    //FIXME: Move this methods to a service
    formatDate(date: DateObject) {
        const dateString = `${date.year}-${date.month}-${date.day}`;
        this.cashDashboardService.date = moment(dateString);
    }

    getRegisterDetails(currentItem) {
        this.cashDashboardService.selectedTransaction = currentItem;
        console.log(currentItem);
    }

    logCell(item) {
        console.log('ITEM');
        console.log(item);
    }
}

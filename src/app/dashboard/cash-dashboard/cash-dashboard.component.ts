import { Component, OnInit } from '@angular/core';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';
import { DateHandlerService } from '@app/_services/date-handler.service';

@Component({
    selector: 'app-cash-dashboard',
    templateUrl: './cash-dashboard.component.html',
    styleUrls: ['./cash-dashboard.component.scss']
})
export class CashDashboardComponent implements OnInit {
    displayMonths = 1;
    navigation = 'select';
    showWeekNumbers = false;
    outsideDays = 'visible';

    columns: any[] = [
        { header: 'ID', binding: 'id', width: 80 },
        { header: 'Concepto', binding: 'concept', width: '*' },
        { header: 'Subconcepto', binding: 'subconcept', width: '*' },
        { header: 'Ingreso', binding: 'inflow', width: 100 },
        { header: 'Egreso', binding: 'outflow', width: 100 },
        { header: 'Hora', binding: 'time', width: 80 }
    ];

    constructor(public cashDashboardService: CashDashboardService, private dateHandlerService: DateHandlerService) {}

    ngOnInit(): void {
        this.cashDashboardService.ngbDate = this.dateHandlerService.formatMomentToObject(this.cashDashboardService.date);
    }

    //FIXME: Move this methods to a service
    formatDate(date: DateObject, fromOrTo: string) {
        const dateString = `${date.year}-${date.month}-${date.day}`;
        this.cashDashboardService.date = moment(dateString);
    }

    //TODO: Implement this method
    getRegisterDetails(currentItem) {
        console.log(currentItem);
    }
}

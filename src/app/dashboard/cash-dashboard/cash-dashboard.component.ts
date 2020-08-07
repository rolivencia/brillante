import * as moment from 'moment';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DateHandlerService } from '@app/_services/date-handler.service';
import { DateObject } from '@app/_models/date-object';
import { FlexGrid } from 'wijmo/wijmo.grid';

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

    controlsLoaded: boolean = false;

    columns: any[] = [
        { header: 'ID', binding: 'id', width: 60 },
        { header: 'Concepto', binding: 'concept.parent.description', width: '*' },
        { header: 'Subconcepto', binding: 'concept.description', width: '*' },
        { header: 'Ingreso', binding: 'amount', width: 80 },
        { header: 'Egreso', binding: 'amount', width: 80 },
        { header: 'Hora', binding: 'date', width: 60 }
    ];

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private dateHandlerService: DateHandlerService
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.ngbDate = this.dateHandlerService.formatMomentToObject(this.cashDashboardService.date);
        this.cashFormHandlerService.formGroup = this.cashFormHandlerService.load();
        this.cashFormHandlerService.controlsLoaded.subscribe(result => {
            this.controlsLoaded = result;
            if (result) {
                this.cashDashboardService.load(moment());
            }
        });
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
        this.changeDetectorRef.detectChanges();
    }

    logCell(item) {
        console.log('ITEM');
        console.log(item);
    }
}

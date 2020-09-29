import * as moment from 'moment';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateObject } from '@app/_models/date-object';
import { FlexGrid, GroupRow } from '@grapecity/wijmo.grid';
import { ToastrService } from 'ngx-toastr';
import { CashTransaction } from '@app/_models/cash-transaction';

@Component({
    selector: 'app-cash-grid-results',
    templateUrl: './cash-grid-results.component.html',
    styleUrls: ['./cash-grid-results.component.scss'],
    encapsulation: ViewEncapsulation.None,
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
        { header: 'Ingreso', binding: 'income', width: 80 },
        { header: 'Egreso', binding: 'expense', width: 80 },
        { header: 'Saldo', binding: 'amount', width: 80 },
        { header: 'Hora', binding: 'date', width: 60 },
    ];

    constructor(public cashDashboardService: CashDashboardService, private toastrService: ToastrService) {}

    ngOnInit(): void {
        this.cashDashboardService.editMode.subscribe((result) => {
            this.editMode = result;
        });
    }

    initializeGrid(flex: FlexGrid) {
        flex.columnFooters.rows.push(new GroupRow());
        flex.bottomLeftCells.setCellData(0, 0, '$');
    }

    //FIXME: Move this method to a service
    public formatDate(date: DateObject) {
        const dateString = `${date.year}-${date.month}-${date.day}`;
        this.cashDashboardService.date = moment(dateString);
    }

    //FIXME: Move this method to a service
    public setTodayDate() {
        this.cashDashboardService.ngbDate = { year: moment().year(), month: (moment().month() + 1) % 13, day: moment().date() };
        this.refreshGrid(this.cashDashboardService.ngbDate);
    }

    public refreshGrid(date: DateObject) {
        this.formatDate(date);
        this.cashDashboardService.load(this.cashDashboardService.date);
        this.cashDashboardService.selectedTransaction = null;
    }

    public getRegisterDetails(currentItem: CashTransaction) {
        this.cashDashboardService.selectedTransaction = currentItem;
    }

    public generateReport() {
        this.toastrService.warning(`¡Disponible en breve!`, 'Funcionalidad aún en desarrollo.');
    }
}

import { Component, OnInit } from '@angular/core';
import { RepairService } from '@app/_services/repair.service';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { CollectionView, SortDescription } from 'wijmo/wijmo';
import * as moment from 'moment';
import { Moment } from 'moment';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-repair-grid-results',
    templateUrl: './repair-grid-results.component.html',
    styleUrls: ['./repair-grid-results.component.scss', '../repair-dashboard.component.scss']
})
export class RepairGridResultsComponent implements OnInit {
    constructor(private repairService: RepairService, public repairDashboardService: RepairDashboardService) {}

    gridData: any;
    gridCollection: CollectionView;
    pageSize = 22;

    ngbDateFrom: DateObject;
    ngbDateTo: DateObject;

    ngbMinDate: DateObject;
    ngbMaxDate: DateObject;

    private _showFinished = false;
    private _dateFrom: Moment;
    private _dateTo: Moment;

    columns: any[] = [
        { header: 'ID', binding: 'repairId', width: 50 },
        { header: 'Cliente', binding: 'nombreApellidoCliente', width: '*' },
        { header: 'Marca', binding: 'marca', width: 110 },
        { header: 'Modelo', binding: 'modelo', width: '*' },
        { header: 'IMEI', binding: 'imei', width: '*' },
        { header: 'Última Act.', binding: 'fechaUltimaActualizacion', width: '*' },
        { header: 'Estado', binding: 'estado', width: '*' }
    ];

    displayMonths = 1;
    navigation = 'select';
    showWeekNumbers = false;
    outsideDays = 'visible';

    ngOnInit() {
        this._dateTo = moment();
        this._dateFrom = moment().subtract(1, 'month');

        this.ngbDateTo = this.formatMomentToObject(this._dateTo);
        this.ngbDateFrom = this.formatMomentToObject(this._dateFrom);
        this.ngbMaxDate = this.formatMomentToObject(this._dateTo);

        this.getGridData(this.showFinished);
    }

    formatDate(date: DateObject, fromOrTo: string) {
        const dateString = `${date.year}-${date.month}-${date.day}`;

        if (fromOrTo === 'from') {
            this._dateFrom = moment(dateString);
        }
        if (fromOrTo === 'to') {
            this._dateTo = moment(dateString);
        }
    }

    formatMomentToObject(momentDate: Moment): DateObject {
        return {
            year: momentDate.get('year'),
            month: momentDate.get('month') + 1,
            day: momentDate.get('date')
        };
    }

    //FIXME: Mover funcionalidad a service, a fin de poder refrescar la grid
    getGridData(showFinished: boolean) {
        this.repairService
            .getAllLegacy(showFinished, this._dateFrom, this._dateTo)
            .pipe(take(1))
            .subscribe(
                data => {
                    this.gridData = data;
                    this.gridCollection = new CollectionView(this.gridData.data);
                    this.gridCollection.pageSize = this.pageSize;
                    this.gridCollection.currentItem = null;
                    const sortDescription = new SortDescription('fechaUltimaActualizacion', false);
                    this.gridCollection.sortDescriptions.push(sortDescription);
                },
                error => console.error(error)
            );
    }

    get showFinished(): boolean {
        return this._showFinished;
    }

    set showFinished(value: boolean) {
        this._showFinished = value;
    }

    getRepairDetails(item) {
        this.repairDashboardService.selectedRepair = item;
    }
}

export class DateObject {
    year: number;
    month: number;
    day: number;
}

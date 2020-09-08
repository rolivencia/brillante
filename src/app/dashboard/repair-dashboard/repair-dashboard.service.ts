import { ActivatedRoute, Router } from '@angular/router';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { RepairLegacy } from '@app/_models';
import { RepairService } from '@app/_services/repair.service';
import { DateObject } from '@app/_models/date-object';
import * as moment from 'moment';
import { ProgressLoaderService } from '@app/_components/progress-loader/progress-loader.service';

@Injectable()
export class RepairDashboardService {
    get selectedRepair(): any {
        return this._selectedRepair;
    }

    set selectedRepair(value: any) {
        this._selectedRepair = value;
    }

    //FIXME: Generar getters y setters para variables de servicio
    public gridData;
    public gridCollection;
    public pageSize = 22;

    public date: Moment = moment();

    public ngbDateFrom: DateObject;
    public ngbDateTo: DateObject;

    public ngbMinDate: DateObject = { year: 2020, month: 1, day: 1 };
    public ngbMaxDate: DateObject = { year: this.date.year(), month: (this.date.month() + 1) % 13, day: this.date.date() };

    public _showFinished = false;
    _dateFrom: Moment;
    _dateTo: Moment;

    private _selectedRepair: RepairLegacy; //FIXME: Adaptar posteriormente a nuevo formato de reparación

    constructor(
        private progressLoaderService: ProgressLoaderService,
        private route: ActivatedRoute,
        private router: Router,
        private repairService: RepairService
    ) {}

    //FIXME: Move saving logic here
    // public saveRepair(newClient, newRepair) {
    //     alert(JSON.stringify(newRepair));
    // }

    async getGridData() {
        this.progressLoaderService.showWithOverlay();
        this.gridData = await this.repairService.getAllLegacy(this._showFinished, this._dateFrom, this._dateTo).toPromise();
        this.gridCollection = new CollectionView(this.gridData.data);
        this.gridCollection.pageSize = this.pageSize;
        this.gridCollection.currentItem = null;
        const sortDescription = new SortDescription('fechaUltimaActualizacion', false);
        this.gridCollection.sortDescriptions.push(sortDescription);
        this.progressLoaderService.hide();
    }
}

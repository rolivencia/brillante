import { ActivatedRoute, Router } from '@angular/router';
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { RepairService } from '@services/repair.service';
import { DateObject } from '@models/date-object';
import * as moment from 'moment';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { Repair } from '@models/repair';

@Injectable()
export class RepairDashboardService {
    get selectedRepair(): Repair {
        return this._selectedRepair;
    }

    set selectedRepair(value: Repair) {
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
    public ngbMaxDate: DateObject = {
        year: this.date.year(),
        month: (this.date.month() + 1) % 13,
        day: this.date.date(),
    };

    public _showFinished = false;
    _dateFrom: Moment;
    _dateTo: Moment;

    private _selectedRepair: Repair;

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
        this.gridData = await this.repairService.getAll(this._showFinished).toPromise();
        this.gridCollection = new CollectionView(this.gridData);
        this.gridCollection.pageSize = this.pageSize;
        this.gridCollection.currentItem = null;
        const sortDescription = new SortDescription('lastUpdate', false);
        this.gridCollection.sortDescriptions.push(sortDescription);
        this.progressLoaderService.hide();
    }
}

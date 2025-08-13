import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RepairService } from '@services/repair.service';
import { DateObject } from '@models/date-object';
import { ProgressLoaderService } from '@components/progress-loader/progress-loader.service';
import { Repair } from '@models/repair';
import { getYear, getMonth, getDate } from 'date-fns';

@Injectable()
export class RepairDashboardService {
    get selectedRepair(): Repair {
        return this._selectedRepair;
    }

    set selectedRepair(value: Repair) {
        this._selectedRepair = value;
    }

    //FIXME: Generar getters y setters para variables de servicio
    public gridData: Repair[] = [];

    public date: Date = new Date();

    public ngbDateFrom: DateObject;
    public ngbDateTo: DateObject;

    public ngbMinDate: DateObject = { year: 2020, month: 1, day: 1 };
    public ngbMaxDate: DateObject = {
        year: getYear(this.date),
        month: (getMonth(this.date) + 1) % 13,
        day: getDate(this.date),
    };

    public _showFinished = false;
    _dateFrom: Date;
    _dateTo: Date;

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
        this.progressLoaderService.hide();
    }
}

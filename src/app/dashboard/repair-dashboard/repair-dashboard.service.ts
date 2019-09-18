import { Injectable } from '@angular/core';
import { RepairLegacy } from '@app/_models';

@Injectable()
export class RepairDashboardService {
    get selectedRepair(): any {
        return this._selectedRepair;
    }

    set selectedRepair(value: any) {
        this._selectedRepair = value;
    }

    private _selectedRepair: RepairLegacy;

    constructor() {}
}

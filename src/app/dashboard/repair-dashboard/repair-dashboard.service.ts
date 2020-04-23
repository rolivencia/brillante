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
    public showGridOnLeftOutlet: boolean = true;
    public showDetailsOnRightOutlet: boolean = true;
    public showAdd: boolean = false;
    public showUpdate: boolean = false;

    constructor() {}

    public toggleGrid() {
        this.showGridOnLeftOutlet = !this.showGridOnLeftOutlet;
    }

    toggleAdd() {
        this.showAdd = !this.showAdd;
        this.showUpdate = false;
        this.toggleGrid();
        this.toggleDetails();
    }

    toggleUpdate() {
        this.showUpdate = !this.showUpdate;
        this.showAdd = false;
        this.toggleGrid();
        this.toggleDetails();
    }

    public toggleDetails() {
        this.showDetailsOnRightOutlet = !this.showDetailsOnRightOutlet;
    }

    public saveRepair(newClient, newRepair) {
        alert(JSON.stringify(newRepair));
    }
}

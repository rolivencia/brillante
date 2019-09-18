import { Component, OnInit } from '@angular/core';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';

@Component({
    selector: 'app-repair-dashboard',
    templateUrl: './repair-dashboard.component.html',
    styleUrls: ['./repair-dashboard.component.scss']
})
export class RepairDashboardComponent implements OnInit {
    constructor(public repairDashboardService: RepairDashboardService) {}

    ngOnInit() {}
}

export class DateObject {
    year: number;
    month: number;
    day: number;
}

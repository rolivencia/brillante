import { Component, OnInit } from '@angular/core';
import { RepairDashboardService } from '@pages/repair-dashboard/repair-dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-repair-dashboard',
    templateUrl: './repair-dashboard.component.html',
    styleUrls: ['./repair-dashboard.component.scss'],
})
export class RepairDashboardComponent implements OnInit {
    constructor(
        public repairDashboardService: RepairDashboardService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {}
}

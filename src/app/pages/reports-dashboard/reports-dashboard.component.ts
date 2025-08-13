import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reports-dashboard',
    templateUrl: './reports-dashboard.component.html',
    styleUrls: ['./reports-dashboard.component.scss'],
    standalone: false,
})
export class ReportsDashboardComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    public goToCashReports() {
        this.router.navigate(['reports-dashboard/cash-report']).then((result) => console.log(result));
    }
}

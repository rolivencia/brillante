import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-settings-dashboard',
    templateUrl: './settings-dashboard.component.html',
    styleUrls: ['./settings-dashboard.component.scss'],
    standalone: false,
})
export class SettingsDashboardComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    public goToOfficeBranches() {
        this.router.navigate(['settings-dashboard/office-branches']).then((result) => console.log(result));
    }

    public goToUserManagement() {
        this.router.navigate(['settings-dashboard/user-management']).then((result) => console.log(result));
    }

    public goToConceptsManagement() {
        this.router.navigate(['settings-dashboard/concepts']).then((result) => console.log(result));
    }
}

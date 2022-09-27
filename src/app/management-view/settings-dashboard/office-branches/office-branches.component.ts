import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-office-branches',
    templateUrl: './office-branches.component.html',
    styleUrls: ['./office-branches.component.scss'],
})
export class OfficeBranchesComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {}

    goToAdd($event) {
        this.router.navigate(['add'], { relativeTo: this.route });
    }

    goToSelect($event) {
        this.router.navigate(['./'], { relativeTo: this.route });
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OfficeBranch } from '@models/office-branch';
import { OfficeBranchService } from '@services/office-branch.service';

@Component({
    selector: 'app-office-branches',
    templateUrl: './office-branches.component.html',
    styleUrls: ['./office-branches.component.scss'],
})
export class OfficeBranchesComponent implements OnInit {
    public officeBranches$: Observable<OfficeBranch[]> = of();

    constructor(
        private officeBranchService: OfficeBranchService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.officeBranches$ = this.officeBranchService.fetch();
    }

    goToAdd($event) {
        this.router.navigate(['add'], { relativeTo: this.route });
    }

    goToSelect($event) {
        this.router.navigate(['./'], { relativeTo: this.route });
    }
}

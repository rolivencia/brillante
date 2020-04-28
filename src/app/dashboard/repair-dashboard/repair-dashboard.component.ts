import { Component, OnInit } from '@angular/core';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-repair-dashboard',
    templateUrl: './repair-dashboard.component.html',
    styleUrls: ['./repair-dashboard.component.scss']
})
export class RepairDashboardComponent implements OnInit {
    constructor(public repairDashboardService: RepairDashboardService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        // this.router.navigate(['manage', { outlets: { left: 'grid', right: 'selected' } }], { relativeTo: this.route });
        // this.router.navigate([{ outlets: { bookPopup: [ 'update-book' ] }}]);
        // this.router
        //     .navigate([{ outlets: { left: ['grid'], right: ['selected'], primary: ['repair-dashboard'] } }, { relativeTo: this.route }])
        //     .then(result => console.log(result));
    }
}

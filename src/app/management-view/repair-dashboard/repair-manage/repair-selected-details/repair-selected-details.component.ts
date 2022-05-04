import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepairDashboardService } from '@management-view/repair-dashboard/repair-dashboard.service';
import { RepairService } from '@services/repair.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Repair } from '@models/repair';
import { routePaths } from '@app/app.routing';

@Component({
    selector: 'app-repair-selected-details',
    templateUrl: './repair-selected-details.component.html',
    styleUrls: ['./repair-selected-details.component.scss', '../repair-manage.component.scss'],
})
export class RepairSelectedDetailsComponent implements OnInit {
    constructor(
        private repairService: RepairService,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        public repairDashboardService: RepairDashboardService
    ) {}

    ngOnInit() {}

    delete(id: number) {
        this.repairService.delete(id).subscribe(
            (data) => {
                console.log(data.response);
                this.toastrService.info(`Eliminada reparación ID ${id}`);
            },
            (error) => console.error(error.message),
            () => {
                this.modalService.dismissAll();
                this.repairDashboardService.getGridData();
            }
        );
    }

    public add() {
        this.router.navigate([`${routePaths.repair.path}/add`]);
    }

    public update(repair: Repair) {
        this.router.navigate([`${routePaths.repair.path}/update/${repair.id}`]);
    }

    public open(content) {
        this.modalService.open(content);
    }
}

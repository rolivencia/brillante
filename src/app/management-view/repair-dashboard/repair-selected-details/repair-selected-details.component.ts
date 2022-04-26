import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepairDashboardService } from '@management-view/repair-dashboard/repair-dashboard.service';
import { RepairService } from '@services/repair.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Repair } from '@models/repair';

@Component({
    selector: 'app-repair-selected-details',
    templateUrl: './repair-selected-details.component.html',
    styleUrls: ['./repair-selected-details.component.scss', '../repair-dashboard.component.scss'],
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

    add() {
        this.router.navigate(['repair-dashboard', { outlets: { top: 'add', left: null, right: null } }]);
    }

    //FIXME: Actualizar a Repair una vez finalizada la migración
    update(repair: Repair) {
        this.router.navigate([
            'repair-dashboard',
            { outlets: { top: 'update/' + repair.id, left: null, right: null } },
        ]);
    }

    open(content) {
        this.modalService.open(content);
    }
}

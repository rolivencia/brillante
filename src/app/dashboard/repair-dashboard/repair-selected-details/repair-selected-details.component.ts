import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairLegacy } from '@app/_models';
import { RepairService } from '@app/_services/repair.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-repair-selected-details',
    templateUrl: './repair-selected-details.component.html',
    styleUrls: ['./repair-selected-details.component.scss', '../repair-dashboard.component.scss']
})
export class RepairSelectedDetailsComponent implements OnInit {
    constructor(
        private repairService: RepairService,
        private modalService: NgbModal,
        private router: Router,
        public repairDashboardService: RepairDashboardService
    ) {}

    ngOnInit() {}

    // FIXME: Update to internal link after the update is migrated to Angular app
    goToUpdate(repairId: number) {
        const redirectTo = 'https://brillante.brillantestore.com/fix-vista-de-actualizacion/?repairId=' + repairId;
        window.open(redirectTo, '_blank');
    }

    delete(id: number) {
        this.repairService.delete(id).subscribe(
            data => console.log(data.message),
            error => console.error(error.message),
            () => {
                this.modalService.dismissAll();
                this.repairDashboardService.getGridData();
            }
        );
    }

    add() {
        this.router.navigate(['repair-dashboard/manage', { outlets: { top: 'add', left: null, right: null } }]);
    }

    //FIXME: Actualizar a Repair una vez finalizada la migración
    update(repair: RepairLegacy) {
        this.router.navigate(['repair-dashboard/manage', { outlets: { top: 'update/' + repair.repairId, left: null, right: null } }]);
    }

    open(content) {
        this.modalService.open(content);
    }
}

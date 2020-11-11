import * as moment from 'moment';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DateHandlerService } from '@app/_services/date-handler.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cash-dashboard',
    templateUrl: './cash-dashboard.component.html',
    styleUrls: ['./cash-dashboard.component.scss'],
})
export class CashDashboardComponent implements OnInit {
    editMode: boolean;

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private dateHandlerService: DateHandlerService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.ngbDateFrom = this.dateHandlerService.formatMomentToObject(this.cashDashboardService.date);
        this.cashDashboardService.ngbDateTo = this.dateHandlerService.formatMomentToObject(this.cashDashboardService.date);
        this.cashFormHandlerService.formGroup = this.cashFormHandlerService.load();

        this.cashDashboardService.editMode.subscribe((value) => {
            this.editMode = value;
        });
    }

    public navigateTo(top = null, left = null, right = null) {
        this.router.navigate(['cash-dashboard/manage', { outlets: { top: top, left: left, right: right } }]);
    }
}

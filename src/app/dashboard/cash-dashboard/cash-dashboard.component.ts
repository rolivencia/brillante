import * as moment from 'moment';
import { CashDashboardService } from '@app/dashboard/cash-dashboard/cash-dashboard.service';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DateHandlerService } from '@app/_services/date-handler.service';

@Component({
    selector: 'app-cash-dashboard',
    templateUrl: './cash-dashboard.component.html',
    styleUrls: ['./cash-dashboard.component.scss'],
})
export class CashDashboardComponent implements OnInit {
    editMode: boolean;
    controlsLoaded: boolean = false;

    constructor(
        public cashDashboardService: CashDashboardService,
        public cashFormHandlerService: CashFormHandlerService,
        private dateHandlerService: DateHandlerService
    ) {}

    ngOnInit(): void {
        this.cashDashboardService.ngbDateFrom = this.dateHandlerService.formatMomentToObject(this.cashDashboardService.date);
        this.cashDashboardService.ngbDateTo = this.dateHandlerService.formatMomentToObject(this.cashDashboardService.date);
        this.cashFormHandlerService.formGroup = this.cashFormHandlerService.load();
        this.cashFormHandlerService.controlsLoaded.subscribe((result) => {
            this.controlsLoaded = result;
            if (result) {
                this.cashDashboardService.load(moment());
            }
        });
        this.cashDashboardService.editMode.subscribe((value) => {
            this.editMode = value;
        });
    }
}

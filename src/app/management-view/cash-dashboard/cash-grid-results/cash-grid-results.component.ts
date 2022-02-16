import * as moment from 'moment';
import { CashDashboardService } from '@management-view/cash-dashboard/cash-dashboard.service';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { DateObject } from '@models/date-object';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { CashTransaction } from '@models/cash-transaction';
import { Subscription } from 'rxjs';
import { EUserRole } from '@enums/user.enum';
import { OfficeBranchService } from '@services/office-branch.service';
import { AuthenticationService } from '@services/authentication.service';

@Component({
    selector: 'app-cash-grid-results',
    templateUrl: './cash-grid-results.component.html',
    styleUrls: ['./cash-grid-results.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CashGridResultsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('cashGrid', { static: false }) cashGrid: FlexGrid;

    public displayMonths = 1;
    public navigation = 'select';
    public outsideDays = 'visible';

    public editMode: boolean = false;
    public loading: boolean = false;
    public canUserNavigateDates: boolean = false;

    public minDate: DateObject;

    private editModeSubscription: Subscription;
    private loadingSubscription: Subscription;

    columns: any[] = [
        { header: 'ID', binding: 'id', width: 50 },
        { header: 'Concepto', binding: 'concept.parent.description', width: '*' },
        { header: 'Subconcepto', binding: 'concept.description', width: '*' },
        { header: 'Método', binding: 'paymentMethod.description', width: 90 },
        { header: 'Ingreso', binding: 'income', width: 70 },
        { header: 'Egreso', binding: 'expense', width: 70 },
        { header: 'Saldo', binding: 'amount', width: 70 },
        { header: 'Hora', binding: 'date', width: 55 },
    ];

    constructor(
        public authenticationService: AuthenticationService,
        public cashDashboardService: CashDashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private officeBranchService: OfficeBranchService
    ) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashDashboardService.editMode.subscribe((result) => {
            this.editMode = result;
            this.changeDetectorRef.detectChanges();
        });
        this.loadingSubscription = this.cashDashboardService.loading.subscribe((result) => {
            this.loading = result;
            this.changeDetectorRef.detectChanges();
        });
        this.authenticationService.currentUser.subscribe((user) => {
            this.canUserNavigateDates =
                user.roles
                    .map((role) => role.id)
                    .filter((roleId) => [EUserRole.ADMIN, EUserRole.COUNTER_CLERK, EUserRole.OWNER].includes(roleId))
                    .length > 0;
        });
    }

    ngAfterViewInit() {
        this.cashDashboardService.refreshGrid(this.cashDashboardService.ngbDateFrom);
        this.minDate = this.cashDashboardService.ngbMinDateByRole();
    }

    ngOnDestroy(): void {
        this.setTodayDate();
        this.loadingSubscription.unsubscribe();
        this.editModeSubscription.unsubscribe();
        this.editMode = false;
        this.loading = false;
    }

    //FIXME: Move this method to a service
    public setTodayDate() {
        this.cashDashboardService.setTodayDate();
        this.cashDashboardService.refreshGrid(this.cashDashboardService.ngbDateFrom);
    }

    public getRegisterDetails(currentItem: CashTransaction) {
        this.cashDashboardService.selectedTransaction = currentItem;
    }
}

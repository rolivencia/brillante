import { MoneyTransactionConceptsService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { CashDashboardComponent } from './cash-dashboard.component';
import { CashDashboardResolverService } from './cash-dashboard.resolver.service';
import { CashDashboardRoutingModule } from './cash-dashboard-routing.module';
import { CashFormHandlerService } from '@management-view/cash-dashboard/cash-form-handler.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CashDashboardService } from '@management-view/cash-dashboard/cash-dashboard.service';

@NgModule({
    declarations: [CashDashboardComponent],
    imports: [CommonModule, CashDashboardRoutingModule, ReactiveFormsModule],
    providers: [
        MoneyTransactionConceptsService,
        CashDashboardService,
        CashFormHandlerService,
        CashDashboardResolverService,
    ],
})
export class CashDashboardModule {}

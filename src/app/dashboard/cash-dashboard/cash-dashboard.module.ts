import { CashTransactionConceptsService } from './cash-transaction-concepts/cash-transaction-concepts.service';
import { CashDashboardComponent } from './cash-dashboard.component';
import { CashDashboardResolverService } from './cash-dashboard.resolver.service';
import { CashDashboardRoutingModule } from './cash-dashboard-routing.module';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CashDashboardComponent],
    imports: [CommonModule, CashDashboardRoutingModule],
    providers: [CashTransactionConceptsService, CashFormHandlerService, CashDashboardResolverService],
})
export class CashDashboardModule {}

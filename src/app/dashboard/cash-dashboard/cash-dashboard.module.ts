import { CashDashboardRoutingModule } from './cash-dashboard-routing.module';
import { CashDashboardComponent } from './cash-dashboard.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';

@NgModule({
    declarations: [CashDashboardComponent],
    imports: [CommonModule, CashDashboardRoutingModule],
    providers: [CashFormHandlerService],
})
export class CashDashboardModule {}

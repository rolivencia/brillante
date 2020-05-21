import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashDashboardRoutingModule } from './cash-dashboard-routing.module';
import { CashDashboardComponent } from './cash-dashboard.component';

@NgModule({
    declarations: [CashDashboardComponent],
    imports: [CommonModule, CashDashboardRoutingModule]
})
export class CashDashboardModule {}

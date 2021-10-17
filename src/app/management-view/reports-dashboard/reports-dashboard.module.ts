import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsDashboardRoutingModule } from './reports-dashboard-routing.module';
import { ReportsDashboardComponent } from './reports-dashboard.component';

@NgModule({
    declarations: [ReportsDashboardComponent],
    imports: [CommonModule, ReportsDashboardRoutingModule],
})
export class ReportsDashboardModule {}

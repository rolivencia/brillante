import { CommonModule } from '@angular/common';
import { DateHandlerService } from '@services/date-handler.service';
import { NgModule } from '@angular/core';
import { RepairDashboardComponent } from '@management-view/repair-dashboard/repair-dashboard.component';
import { RepairDashboardRoutingModule } from './repair-dashboard-routing.module';
import { RepairDashboardService } from '@management-view/repair-dashboard/repair-dashboard.service';

@NgModule({
    declarations: [RepairDashboardComponent],
    imports: [CommonModule, RepairDashboardRoutingModule],
    providers: [DateHandlerService, RepairDashboardService],
})
export class RepairDashboardModule {}

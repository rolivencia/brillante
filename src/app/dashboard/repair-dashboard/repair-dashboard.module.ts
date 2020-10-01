import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RepairDashboardComponent } from '@app/dashboard/repair-dashboard/repair-dashboard.component';
import { RepairDashboardRoutingModule } from './repair-dashboard-routing.module';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairService } from '@app/_services/repair.service';
import { DateHandlerService } from '@app/_services/date-handler.service';

@NgModule({
    declarations: [RepairDashboardComponent],
    imports: [CommonModule, RepairDashboardRoutingModule],
    providers: [DateHandlerService, RepairDashboardService, RepairService],
})
export class RepairDashboardModule {}

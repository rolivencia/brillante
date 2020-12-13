import { CommonModule } from '@angular/common';
import { DateHandlerService } from '@app/_services/date-handler.service';
import { NgModule } from '@angular/core';
import { RepairDashboardComponent } from '@app/dashboard/repair-dashboard/repair-dashboard.component';
import { RepairDashboardResolverService } from './repair-dashboard.resolver.service';
import { RepairDashboardRoutingModule } from './repair-dashboard-routing.module';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairService } from '@app/_services/repair.service';

@NgModule({
    declarations: [RepairDashboardComponent],
    imports: [CommonModule, RepairDashboardRoutingModule],
    providers: [DateHandlerService, RepairDashboardService, RepairDashboardResolverService, RepairService],
})
export class RepairDashboardModule {}

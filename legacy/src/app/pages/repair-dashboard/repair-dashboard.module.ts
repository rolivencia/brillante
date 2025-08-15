import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RepairDashboardComponent } from '@pages/repair-dashboard/repair-dashboard.component';
import { RepairDashboardRoutingModule } from './repair-dashboard-routing.module';
import { RepairDashboardService } from '@pages/repair-dashboard/repair-dashboard.service';
import { RepairFormHandlerService } from '@pages/repair-dashboard/repair-form-handler.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RepairDashboardComponent],
    imports: [CommonModule, ReactiveFormsModule, RepairDashboardRoutingModule],
    providers: [RepairDashboardService, RepairFormHandlerService],
})
export class RepairDashboardModule {}

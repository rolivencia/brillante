import { CommonModule } from '@angular/common';
import { DateHandlerService } from '@services/date-handler.service';
import { NgModule } from '@angular/core';
import { RepairDashboardComponent } from '@management-view/repair-dashboard/repair-dashboard.component';
import { RepairDashboardRoutingModule } from './repair-dashboard-routing.module';
import { RepairDashboardService } from '@management-view/repair-dashboard/repair-dashboard.service';
import { RepairFormHandlerService } from '@management-view/repair-dashboard/repair-form-handler.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RepairDashboardComponent],
    imports: [CommonModule, ReactiveFormsModule, RepairDashboardRoutingModule],
    providers: [DateHandlerService, RepairDashboardService, RepairFormHandlerService],
})
export class RepairDashboardModule {}

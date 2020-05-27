import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RepairDashboardComponent } from '@app/dashboard/repair-dashboard/repair-dashboard.component';
import { RepairDashboardRoutingModule } from './repair-dashboard-routing.module';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairService } from '@app/_services/repair.service';
import { RouterModule } from '@angular/router';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DateHandlerService } from '@app/_services/date-handler.service';

@NgModule({
    declarations: [RepairDashboardComponent],
    imports: [CommonModule, RepairDashboardRoutingModule],
    providers: [DateHandlerService, LegacyMapperService, RepairDashboardService, RepairService]
})
export class RepairDashboardModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairDashboardRoutingModule } from './repair-dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { RepairDashboardComponent } from '@app/dashboard/repair-dashboard/repair-dashboard.component';
import { RepairGridResultsComponent } from './repair-grid-results/repair-grid-results.component';
import { RepairDashboardService } from '@app/dashboard/repair-dashboard/repair-dashboard.service';
import { RepairSelectedDetailsComponent } from './repair-selected-details/repair-selected-details.component';
import { RepairService } from '@app/_services/repair.service';
import { RouterModule } from '@angular/router';
import { RepairAddNewComponent } from './repair-add-new/repair-add-new.component';
import { RepairUpdateComponent } from './repair-update/repair-update.component';

@NgModule({
    declarations: [
        RepairDashboardComponent,
        RepairGridResultsComponent,
        RepairSelectedDetailsComponent,
        RepairAddNewComponent,
        RepairUpdateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbDatepickerModule,
        RouterModule,
        WjGridModule,
        WjGridFilterModule,
        WjInputModule,
        RepairDashboardRoutingModule
    ],
    providers: [RepairDashboardService, RepairService]
})
export class RepairDashboardModule {}

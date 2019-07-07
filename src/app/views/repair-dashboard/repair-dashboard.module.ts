import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RepairDashboardRoutingModule} from './repair-dashboard-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {WjInputModule} from 'wijmo/wijmo.angular2.input';
import {WjGridModule} from 'wijmo/wijmo.angular2.grid';
import {WjGridFilterModule} from 'wijmo/wijmo.angular2.grid.filter';
import {RepairDashboardComponent} from '@app/views/repair-dashboard/repair-dashboard.component';

@NgModule({
  declarations: [RepairDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    WjGridModule,
    WjGridFilterModule,
    WjInputModule,
    RepairDashboardRoutingModule
  ]
})
export class RepairDashboardModule { }

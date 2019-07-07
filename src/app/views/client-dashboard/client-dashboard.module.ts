import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WjInputModule} from 'wijmo/wijmo.angular2.input';
import {WjGridModule} from 'wijmo/wijmo.angular2.grid';
import {WjGridFilterModule} from 'wijmo/wijmo.angular2.grid.filter';
import {ClientDashboardRoutingModule} from '@app/views/client-dashboard/client-dashboard-routing.module';
import {ClientDashboardComponent} from '@app/views/client-dashboard/client-dashboard.component';

@NgModule({
  declarations: [ClientDashboardComponent],
  imports: [
    CommonModule,
    WjGridModule,
    WjGridFilterModule,
    WjInputModule,
    ClientDashboardRoutingModule
  ]
})
export class ClientDashboardModule { }

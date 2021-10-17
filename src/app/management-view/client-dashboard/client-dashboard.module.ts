import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { ClientDashboardRoutingModule } from '@management-view/client-dashboard/client-dashboard-routing.module';
import { ClientDashboardComponent } from '@management-view/client-dashboard/client-dashboard.component';

@NgModule({
    declarations: [ClientDashboardComponent],
    imports: [CommonModule, WjGridModule, WjGridFilterModule, WjInputModule, ClientDashboardRoutingModule],
})
export class ClientDashboardModule {}

import { ClientDashboardComponent } from '@management-view/client-dashboard/client-dashboard.component';
import { ClientDashboardRoutingModule } from '@management-view/client-dashboard/client-dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { NgModule } from '@angular/core';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

@NgModule({
    declarations: [ClientDashboardComponent],
    imports: [CommonModule, WjGridModule, ClientDashboardRoutingModule, GridModule],
})
export class ClientDashboardModule {}

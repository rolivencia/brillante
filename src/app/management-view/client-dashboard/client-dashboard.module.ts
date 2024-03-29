import { ClientDashboardComponent } from '@management-view/client-dashboard/client-dashboard.component';
import { ClientDashboardRoutingModule } from '@management-view/client-dashboard/client-dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ClientDashboardComponent],
    imports: [CommonModule, ClientDashboardRoutingModule, GridModule],
})
export class ClientDashboardModule {}

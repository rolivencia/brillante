import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDashboardComponent } from '@management-view/client-dashboard/client-dashboard.component';
import { CustomerDashboardGuard } from './customer-dashboard.guard';

const routes: Routes = [{ path: '', component: ClientDashboardComponent, canActivate: [CustomerDashboardGuard] }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientDashboardRoutingModule {}

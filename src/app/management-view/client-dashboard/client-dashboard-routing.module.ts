import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from '@management-view/client-dashboard/client-dashboard.component';
import { CustomerDashboardGuard } from './customer-dashboard.guard';

const routes: Routes = [
    { path: '', component: ClientDashboardComponent, canActivate: [CustomerDashboardGuard] },
    {
        path: 'update/:id',
        loadChildren: () => import('./update-customer/update-customer.module').then((m) => m.UpdateCustomerModule),
        canActivate: [CustomerDashboardGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientDashboardRoutingModule {}

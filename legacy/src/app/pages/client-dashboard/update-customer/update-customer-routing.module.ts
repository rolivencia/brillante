import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCustomerComponent } from '@pages/client-dashboard/update-customer/update-customer.component';
import { UpdateCustomerResolver } from '@pages/client-dashboard/update-customer/update-customer.resolver';

const routes: Routes = [
    {
        path: '',
        component: UpdateCustomerComponent,
        resolve: {
            customer: UpdateCustomerResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UpdateCustomerRoutingModule {}

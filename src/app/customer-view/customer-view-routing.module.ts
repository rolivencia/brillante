import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from './customer-view.component';
import { FinishedRegistrationGuard } from '@guards/finished-registration.guard';

const routes: Routes = [
    {
        path: '',
        component: CustomerViewComponent,
        canActivate: [FinishedRegistrationGuard],
        canActivateChild: [FinishedRegistrationGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'products',
                loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
            },

            {
                path: 'enterprise',
                loadChildren: () => import('./enterprise/enterprise.module').then((m) => m.EnterpriseModule),
            },

            {
                path: 'contact',
                loadChildren: () => import('./contact/contact.module').then((m) => m.ContactModule),
            },

            {
                path: 'repairs',
                loadChildren: () => import('./repairs/repairs.module').then((m) => m.RepairsModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewRoutingModule {}

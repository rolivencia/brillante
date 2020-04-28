﻿import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    // otherwise redirect to home
    {
        path: '',
        loadChildren: () => import('./landing/home/home.module').then(m => m.HomeModule)
    },

    {
        path: 'products',
        loadChildren: () => import('./landing/products/products.module').then(m => m.ProductsModule)
    },

    {
        path: 'enterprise',
        loadChildren: () => import('./landing/enterprise/enterprise.module').then(m => m.EnterpriseModule)
    },

    {
        path: 'contact',
        loadChildren: () => import('./landing/contact/contact.module').then(m => m.ContactModule)
    },

    {
        path: 'repairs',
        loadChildren: () => import('./landing/repairs/repairs.module').then(m => m.RepairsModule)
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'repair-dashboard',
        loadChildren: () => import('./dashboard/repair-dashboard/repair-dashboard.module').then(m => m.RepairDashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'client-dashboard',
        loadChildren: () => import('./dashboard/client-dashboard/client-dashboard.module').then(m => m.ClientDashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'products-dashboard',
        loadChildren: () => import('./dashboard/products-dashboard/products-dashboard.module').then(m => m.ProductsDashboardModule),
        canActivate: [AuthGuard]
    },

    { path: 'login', component: LoginComponent },

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

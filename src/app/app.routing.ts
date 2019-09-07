import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    // otherwise redirect to home
    {
        path: '',
        loadChildren: './landing/home/home.module#HomeModule'
    },

    {
        path: 'products',
        loadChildren: './landing/products/products.module#ProductsModule'
    },

    {
        path: 'enterprise',
        loadChildren: './landing/enterprise/enterprise.module#EnterpriseModule'
    },

    {
        path: 'contact',
        loadChildren: './landing/contact/contact.module#ContactModule'
    },

    {
        path: 'repairs',
        loadChildren: './landing/repairs/repairs.module#RepairsModule'
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'repair-dashboard',
        loadChildren: './dashboard/repair-dashboard/repair-dashboard.module#RepairDashboardModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'client-dashboard',
        loadChildren: './dashboard/client-dashboard/client-dashboard.module#ClientDashboardModule',
        canActivate: [AuthGuard]
    },

    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

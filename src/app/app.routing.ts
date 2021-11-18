import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@management-view/dashboard.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';

import { ReportsGuard } from '@management-view/reports-dashboard/reports.guard';
import { OfficeBranchGuard } from '@guards/office-branch.guard';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./customer-view/customer-view.module').then((m) => m.CustomerViewModule),
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'repair-dashboard',
        loadChildren: () =>
            import('@management-view/repair-dashboard/repair-dashboard.module').then((m) => m.RepairDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'client-dashboard',
        loadChildren: () =>
            import('@management-view/client-dashboard/client-dashboard.module').then((m) => m.ClientDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'cash-dashboard',
        loadChildren: () =>
            import('@management-view/cash-dashboard/cash-dashboard.module').then((m) => m.CashDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'products-list-dashboard',
        loadChildren: () =>
            import('@management-view/products-dashboard/products-dashboard.module').then(
                (m) => m.ProductsDashboardModule
            ),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'settings-dashboard',
        loadChildren: () =>
            import('@management-view/settings-dashboard/settings-dashboard.module').then(
                (m) => m.SettingsDashboardModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'reports-dashboard',
        loadChildren: () =>
            import('@management-view/reports-dashboard/reports-dashboard.module').then((m) => m.ReportsDashboardModule),
        canActivate: [AuthGuard, ReportsGuard],
    },

    { path: 'login', component: LoginComponent },

    { path: '**', redirectTo: 'home' },
];

export const routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });

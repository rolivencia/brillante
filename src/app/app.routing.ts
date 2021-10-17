import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { OfficeBranchGuard } from '@app/_guards/office-branch.guard';
import { AppSettingsGuard } from '@app/_guards/app-settings.guard';
import { ReportsGuard } from '@app/dashboard/reports-dashboard/reports.guard';

const customerRoutes: Routes = [
    {
        path: 'products',
        loadChildren: () => import('./customer-view/products/products.module').then((m) => m.ProductsModule),
    },

    {
        path: 'enterprise',
        loadChildren: () => import('./customer-view/enterprise/enterprise.module').then((m) => m.EnterpriseModule),
    },

    {
        path: 'contact',
        loadChildren: () => import('./customer-view/contact/contact.module').then((m) => m.ContactModule),
    },

    {
        path: 'repairs',
        loadChildren: () => import('./customer-view/repairs/repairs.module').then((m) => m.RepairsModule),
    },
];
const appRoutes: Routes = [
    // otherwise redirect to home
    {
        path: '',
        loadChildren: () => import('./customer-view/home/home.module').then((m) => m.HomeModule),
    },

    ...customerRoutes,

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'repair-dashboard',
        loadChildren: () =>
            import('./dashboard/repair-dashboard/repair-dashboard.module').then((m) => m.RepairDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'client-dashboard',
        loadChildren: () =>
            import('./dashboard/client-dashboard/client-dashboard.module').then((m) => m.ClientDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'cash-dashboard',
        loadChildren: () =>
            import('./dashboard/cash-dashboard/cash-dashboard.module').then((m) => m.CashDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'products-list-dashboard',
        loadChildren: () =>
            import('./dashboard/products-dashboard/products-dashboard.module').then((m) => m.ProductsDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'settings-dashboard',
        loadChildren: () =>
            import('./dashboard/settings-dashboard/settings-dashboard.module').then((m) => m.SettingsDashboardModule),
        canActivate: [AuthGuard, AppSettingsGuard],
    },
    {
        path: 'reports-dashboard',
        loadChildren: () =>
            import('./dashboard/reports-dashboard/reports-dashboard.module').then((m) => m.ReportsDashboardModule),
        canActivate: [AuthGuard, ReportsGuard],
    },

    { path: 'login', component: LoginComponent },

    { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);

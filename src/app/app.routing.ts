import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { OfficeBranchGuard } from '@app/_guards/office-branch.guard';
import { AppSettingsGuard } from '@app/_guards/app-settings.guard';
import { ReportsGuard } from '@app/dashboard/reports-dashboard/reports.guard';

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

    { path: '**', redirectTo: 'home' },
];

export const routing = RouterModule.forRoot(appRoutes);

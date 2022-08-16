import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards';

import { OfficeBranchGuard } from '@guards/office-branch.guard';
import { RepairDashboardGuard } from '@management-view/repair-dashboard/repair-dashboard.guard';

export const routePaths = {
    repair: { path: 'repair', children: {} },
    customer: { path: '', children: { userProfile: { path: 'user-profile' } } },
};

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./customer-view/customer-view.module').then((m) => m.CustomerViewModule),
    },
    {
        path: routePaths.repair.path,
        loadChildren: () =>
            import('@management-view/repair-dashboard/repair-dashboard.module').then((m) => m.RepairDashboardModule),
        canActivate: [AuthGuard, RepairDashboardGuard, OfficeBranchGuard],
    },
    {
        path: routePaths.customer.children.userProfile.path,
        loadChildren: () => import('@customer-view/user-profile/user-profile.module').then((m) => m.UserProfileModule),
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
        canActivate: [AuthGuard],
    },

    { path: '**', redirectTo: 'home' },
];

export const routing = RouterModule.forRoot(appRoutes, {
    relativeLinkResolution: 'legacy',
    onSameUrlNavigation: 'reload',
});

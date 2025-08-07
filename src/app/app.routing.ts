import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards';

import { OfficeBranchGuard } from '@guards/office-branch.guard';
import { RepairDashboardGuard } from '@pages/repair-dashboard/repair-dashboard.guard';

export const routePaths = {
    repair: { path: 'repair', children: {} },
    customer: { path: '', children: { userProfile: { path: 'user-profile' } } },
};

const appRoutes: Routes = [
    {
        path: routePaths.repair.path,
        loadChildren: () =>
            import('@pages/repair-dashboard/repair-dashboard.module').then((m) => m.RepairDashboardModule),
        canActivate: [AuthGuard, RepairDashboardGuard, OfficeBranchGuard],
    },
    {
        path: routePaths.customer.children.userProfile.path,
        loadChildren: () => import('@pages/user-profile/user-profile.module').then((m) => m.UserProfileModule),
    },
    {
        path: 'client-dashboard',
        loadChildren: () =>
            import('@pages/client-dashboard/client-dashboard.module').then((m) => m.ClientDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'cash-dashboard',
        loadChildren: () => import('@pages/cash-dashboard/cash-dashboard.module').then((m) => m.CashDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'products-list-dashboard',
        loadChildren: () =>
            import('@pages/products-dashboard/products-dashboard.module').then((m) => m.ProductsDashboardModule),
        canActivate: [AuthGuard, OfficeBranchGuard],
    },
    {
        path: 'settings-dashboard',
        loadChildren: () =>
            import('@pages/settings-dashboard/settings-dashboard.module').then((m) => m.SettingsDashboardModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'reports-dashboard',
        loadChildren: () =>
            import('@pages/reports-dashboard/reports-dashboard.module').then((m) => m.ReportsDashboardModule),
        canActivate: [AuthGuard],
    },

    { path: '**', redirectTo: 'client-dashboard' },
];

export const routing = RouterModule.forRoot(appRoutes, {
    relativeLinkResolution: 'legacy',
    onSameUrlNavigation: 'reload',
});

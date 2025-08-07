import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsDashboardComponent } from './settings-dashboard.component';
import { CashDashboardResolverService } from '@pages/cash-dashboard/cash-dashboard.resolver.service';
import { CoreAppSettings } from './_guards/core-app-settings.service';
import { AdministrativeAppSettingsGuard } from './_guards/administrative-app-settings.guard';

const routes: Routes = [
    {
        path: '',
        component: SettingsDashboardComponent,
    },
    {
        path: 'office-branches',
        loadChildren: () => import('./office-branches/office-branches.module').then((m) => m.OfficeBranchesModule),
        canActivate: [CoreAppSettings],
    },
    {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then((m) => m.UserManagementModule),
        canActivate: [CoreAppSettings],
    },
    {
        path: 'concepts',
        loadChildren: () =>
            import('./money-transaction-concepts/money-transaction-concepts.module').then(
                (m) => m.MoneyTransactionConceptsModule
            ),
        resolve: {
            concepts: CashDashboardResolverService,
        },
        canActivate: [AdministrativeAppSettingsGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsDashboardRoutingModule {}

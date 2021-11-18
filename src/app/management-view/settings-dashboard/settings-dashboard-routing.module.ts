import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsDashboardComponent } from './settings-dashboard.component';
import { CashDashboardResolverService } from '@management-view/cash-dashboard/cash-dashboard.resolver.service';

const routes: Routes = [
    {
        path: '',
        component: SettingsDashboardComponent,
    },
    {
        path: 'office-branches',
        loadChildren: () => import('./office-branches/office-branches.module').then((m) => m.OfficeBranchesModule),
    },
    {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then((m) => m.UserManagementModule),
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
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsDashboardRoutingModule {}

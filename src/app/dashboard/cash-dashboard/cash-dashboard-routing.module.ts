import { CashDashboardComponent } from '@app/dashboard/cash-dashboard/cash-dashboard.component';
import { CashDashboardResolverService } from './cash-dashboard.resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRolesGuard } from '../../_services/cash-roles-guard.service';

const routes: Routes = [
    {
        path: '',
        component: CashDashboardComponent,
        children: [
            {
                path: 'manage',
                children: [
                    {
                        path: 'grid',
                        loadChildren: () =>
                            import('./cash-grid-results/cash-grid-results.module').then((m) => m.CashGridResultsModule),
                        resolve: {
                            concepts: CashDashboardResolverService,
                        },
                        outlet: 'left',
                    },
                    {
                        path: 'selected',
                        loadChildren: () =>
                            import('./cash-selected-details/cash-selected-details.module').then(
                                (m) => m.CashSelectedDetailsModule
                            ),
                        outlet: 'right',
                    },
                    {
                        path: 'add',
                        loadChildren: () =>
                            import('./cash-add-new/cash-add-new.module').then((m) => m.CashAddNewModule),
                        outlet: 'right',
                    },
                    {
                        path: 'update',
                        loadChildren: () => import('./cash-update/cash-update.module').then((m) => m.CashUpdateModule),
                        outlet: 'right',
                    },
                    {
                        path: 'report',
                        loadChildren: () => import('./cash-report/cash-report.module').then((m) => m.CashReportModule),
                        resolve: {
                            concepts: CashDashboardResolverService,
                        },
                        canActivate: [CashRolesGuard],
                        outlet: 'top',
                    },
                    {
                        path: 'categories',
                        loadChildren: () =>
                            import('./cash-transaction-concepts/cash-transaction-concepts.module').then(
                                (m) => m.CashTransactionConceptsModule
                            ),
                        resolve: {
                            concepts: CashDashboardResolverService,
                        },
                        canActivate: [CashRolesGuard],
                        outlet: 'top',
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CashDashboardRoutingModule {}

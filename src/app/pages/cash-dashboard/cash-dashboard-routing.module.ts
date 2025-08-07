import { CashDashboardComponent } from '@pages/cash-dashboard/cash-dashboard.component';
import { CashDashboardResolverService } from './cash-dashboard.resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRolesGuard } from '@services/cash-roles-guard.service';

const routes: Routes = [
    {
        path: '',
        component: CashDashboardComponent,
        canActivate: [CashRolesGuard],
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

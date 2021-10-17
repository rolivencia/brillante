import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairDashboardComponent } from '@management-view/repair-dashboard/repair-dashboard.component';
import { RepairDashboardResolverService } from './repair-dashboard.resolver.service';

const routes: Routes = [
    {
        path: '',
        component: RepairDashboardComponent,
        resolve: {
            concepts: RepairDashboardResolverService,
        },
        children: [
            {
                path: 'manage',
                children: [
                    {
                        path: 'grid',
                        loadChildren: () =>
                            import('./repair-grid-results/repair-grid-results.module').then(
                                (m) => m.RepairGridResultsModule
                            ),
                        outlet: 'left',
                    },
                    {
                        path: 'selected',
                        loadChildren: () =>
                            import('./repair-selected-details/repair-selected-details.module').then(
                                (m) => m.RepairSelectedDetailsModule
                            ),
                        outlet: 'right',
                    },
                    {
                        path: 'add',
                        loadChildren: () =>
                            import('./repair-add-new/repair-add-new.module').then((m) => m.RepairAddNewModule),
                        outlet: 'top',
                    },
                    {
                        path: 'update',
                        loadChildren: () =>
                            import('./repair-update/repair-update.module').then((m) => m.RepairUpdateModule),
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
export class RepairDashboardRoutingModule {}

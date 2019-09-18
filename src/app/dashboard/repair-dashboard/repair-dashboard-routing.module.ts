import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairDashboardComponent } from '@app/dashboard/repair-dashboard/repair-dashboard.component';
import { RepairGridResultsComponent } from '@app/dashboard/repair-dashboard/repair-grid-results/repair-grid-results.component';
import { RepairSelectedDetailsComponent } from '@app/dashboard/repair-dashboard/repair-selected-details/repair-selected-details.component';

const routes: Routes = [
    {
        path: '',
        component: RepairDashboardComponent,
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: RepairGridResultsComponent,
                outlet: 'left-outlet'
            },
            {
                path: '',
                component: RepairSelectedDetailsComponent,
                outlet: 'right-outlet'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RepairDashboardRoutingModule {}

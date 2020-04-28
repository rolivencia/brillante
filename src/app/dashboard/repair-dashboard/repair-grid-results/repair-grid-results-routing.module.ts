import { NgModule } from '@angular/core';
import { RepairGridResultsComponent } from '@app/dashboard/repair-dashboard/repair-grid-results/repair-grid-results.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RepairGridResultsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RepairGridResultsRoutingModule {}

import { NgModule } from '@angular/core';
import { RepairSelectedDetailsComponent } from '@app/dashboard/repair-dashboard/repair-selected-details/repair-selected-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RepairSelectedDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RepairSelectedDetailsRoutingModule {}

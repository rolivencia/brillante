import { NgModule } from '@angular/core';
import { RepairUpdateComponent } from '@app/dashboard/repair-dashboard/repair-update/repair-update.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RepairUpdateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RepairUpdateRoutingModule {}

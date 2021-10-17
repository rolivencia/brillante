import { NgModule } from '@angular/core';
import { RepairAddNewComponent } from '@management-view/repair-dashboard/repair-add-new/repair-add-new.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RepairAddNewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RepairAddNewRoutingModule {}

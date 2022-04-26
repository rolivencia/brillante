import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairManageComponent } from '@management-view/repair-dashboard/repair-manage/repair-manage.component';

const routes: Routes = [{ path: '', component: RepairManageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RepairManageRoutingModule {}

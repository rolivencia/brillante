import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeBranchesComponent } from './office-branches.component';
import { SelectOfficeBranchComponent } from '@management-view/settings-dashboard/office-branches/select-office-branch/select-office-branch.component';

const routes: Routes = [
    { path: '', component: OfficeBranchesComponent, children: [{ path: '', component: SelectOfficeBranchComponent }] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OfficeBranchesRoutingModule {}

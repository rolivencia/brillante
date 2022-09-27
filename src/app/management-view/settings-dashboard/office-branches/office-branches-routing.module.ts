import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeBranchesComponent } from './office-branches.component';
import { SelectOfficeBranchComponent } from '@management-view/settings-dashboard/office-branches/select-office-branch/select-office-branch.component';
import { AddOfficeBranchComponent } from '@management-view/settings-dashboard/office-branches/add-office-branch/add-office-branch.component';
import { OfficeBranchesResolver } from '@management-view/settings-dashboard/office-branches/office-branches.resolver';

const routes: Routes = [
    {
        path: '',
        component: OfficeBranchesComponent,
        resolve: { officeBranches: OfficeBranchesResolver },
        children: [
            { path: '', component: SelectOfficeBranchComponent },
            { path: 'add', component: AddOfficeBranchComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OfficeBranchesRoutingModule {}

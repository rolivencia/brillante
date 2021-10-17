import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeBranchesComponent } from './office-branches.component';

const routes: Routes = [{ path: '', component: OfficeBranchesComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OfficeBranchesRoutingModule {}

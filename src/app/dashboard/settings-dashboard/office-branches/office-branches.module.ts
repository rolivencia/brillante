import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeBranchesRoutingModule } from './office-branches-routing.module';
import { OfficeBranchesComponent } from './office-branches.component';

@NgModule({
    declarations: [OfficeBranchesComponent],
    imports: [CommonModule, OfficeBranchesRoutingModule],
})
export class OfficeBranchesModule {}

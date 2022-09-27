import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OfficeBranchesComponent } from './office-branches.component';
import { OfficeBranchesRoutingModule } from './office-branches-routing.module';
import { SelectOfficeBranchComponent } from './select-office-branch/select-office-branch.component';

@NgModule({
    declarations: [OfficeBranchesComponent, SelectOfficeBranchComponent],
    imports: [CommonModule, DropDownListModule, FormsModule, OfficeBranchesRoutingModule, ReactiveFormsModule],
})
export class OfficeBranchesModule {}

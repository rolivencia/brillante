import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OfficeBranchesComponent } from './office-branches.component';
import { OfficeBranchesRoutingModule } from './office-branches-routing.module';

@NgModule({
    declarations: [OfficeBranchesComponent],
    imports: [CommonModule, DropDownListModule, FormsModule, OfficeBranchesRoutingModule, ReactiveFormsModule],
})
export class OfficeBranchesModule {}

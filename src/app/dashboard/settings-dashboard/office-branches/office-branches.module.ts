import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { OfficeBranchesRoutingModule } from './office-branches-routing.module';
import { OfficeBranchesComponent } from './office-branches.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [OfficeBranchesComponent],
    imports: [CommonModule, FormsModule, OfficeBranchesRoutingModule, WjInputModule],
})
export class OfficeBranchesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairAddNewRoutingModule } from './repair-add-new-routing.module';
import { RepairAddNewComponent } from '@app/dashboard/repair-dashboard/repair-add-new/repair-add-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

@NgModule({
    declarations: [RepairAddNewComponent],
    imports: [CommonModule, ReactiveFormsModule, RepairAddNewRoutingModule, WjInputModule]
})
export class RepairAddNewModule {}

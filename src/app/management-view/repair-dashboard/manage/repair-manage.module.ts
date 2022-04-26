import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairManageRoutingModule } from './repair-manage-routing.module';
import { RepairManageComponent } from './repair-manage.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [RepairManageComponent],
    imports: [CommonModule, FormsModule, RepairManageRoutingModule],
})
export class RepairManageModule {}

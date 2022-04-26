import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairManageRoutingModule } from './repair-manage-routing.module';
import { RepairManageComponent } from './repair-manage.component';

@NgModule({
    declarations: [RepairManageComponent],
    imports: [CommonModule, RepairManageRoutingModule],
})
export class RepairManageModule {}

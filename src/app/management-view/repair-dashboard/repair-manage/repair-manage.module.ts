import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairManageRoutingModule } from './repair-manage-routing.module';
import { RepairManageComponent } from './repair-manage.component';
import { RepairGridResultsModule } from './repair-grid-results/repair-grid-results.module';
import { RepairSelectedDetailsModule } from './repair-selected-details/repair-selected-details.module';

@NgModule({
    declarations: [RepairManageComponent],
    imports: [CommonModule, RepairManageRoutingModule, RepairGridResultsModule, RepairSelectedDetailsModule],
})
export class RepairManageModule {}

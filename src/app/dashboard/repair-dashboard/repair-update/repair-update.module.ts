import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RepairUpdateComponent } from '@app/dashboard/repair-dashboard/repair-update/repair-update.component';
import { RepairUpdateRoutingModule } from './repair-update-routing.module';

@NgModule({
    declarations: [RepairUpdateComponent],
    imports: [CommonModule, RepairUpdateRoutingModule]
})
export class RepairUpdateModule {}

import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RepairSelectedDetailsComponent } from '@app/dashboard/repair-dashboard/repair-selected-details/repair-selected-details.component';
import { RepairSelectedDetailsRoutingModule } from './repair-selected-details-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [RepairSelectedDetailsComponent],
    imports: [CommonModule, FormsModule, NgbModalModule, RepairSelectedDetailsRoutingModule]
})
export class RepairSelectedDetailsModule {}

import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RepairSelectedDetailsComponent } from './repair-selected-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [RepairSelectedDetailsComponent],
    imports: [CommonModule, FormsModule, NgbModalModule],
    exports: [RepairSelectedDetailsComponent],
})
export class RepairSelectedDetailsModule {}

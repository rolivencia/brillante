import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RepairUpdateComponent } from '@app/dashboard/repair-dashboard/repair-update/repair-update.component';
import { RepairUpdateRoutingModule } from './repair-update-routing.module';
import { RepairService } from '@app/_services/repair.service';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RepairUpdateComponent],
    imports: [CommonModule, RepairUpdateRoutingModule, WjInputModule, ReactiveFormsModule],
    providers: [LegacyMapperService, RepairService]
})
export class RepairUpdateModule {}

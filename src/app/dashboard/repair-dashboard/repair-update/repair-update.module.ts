import { CommonModule } from '@angular/common';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { NgModule } from '@angular/core';
import { RepairService } from '@app/_services/repair.service';
import { RepairUpdateComponent } from '@app/dashboard/repair-dashboard/repair-update/repair-update.component';
import { RepairUpdateRoutingModule } from './repair-update-routing.module';
import { RepairVoucherGeneratorService } from '@app/dashboard/repair-dashboard/repair-voucher-generator.service';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RepairUpdateComponent],
    imports: [CommonModule, FormsModule, RepairUpdateRoutingModule, WjInputModule, ReactiveFormsModule, WjGridModule],
    providers: [LegacyMapperService, RepairService, RepairVoucherGeneratorService]
})
export class RepairUpdateModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RepairUpdateComponent } from '@management-view/repair-dashboard/repair-update/repair-update.component';
import { RepairUpdateRoutingModule } from './repair-update-routing.module';
import { RepairVoucherGeneratorService } from '@management-view/repair-dashboard/repair-voucher-generator.service';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodSelectorModule } from '../../../_components/payment-method-selector/payment-method-selector.module';

@NgModule({
    declarations: [RepairUpdateComponent],
    imports: [
        CommonModule,
        FormsModule,
        RepairUpdateRoutingModule,
        WjInputModule,
        ReactiveFormsModule,
        WjGridModule,
        PaymentMethodSelectorModule,
    ],
    providers: [RepairVoucherGeneratorService],
})
export class RepairUpdateModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RepairUpdateComponent } from '@management-view/repair-dashboard/repair-update/repair-update.component';
import { RepairUpdateRoutingModule } from './repair-update-routing.module';
import { RepairVoucherGeneratorService } from '@management-view/repair-dashboard/repair-voucher-generator.service';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodSelectorModule } from '@components/payment-method-selector/payment-method-selector.module';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { PaymentInputModule } from '@components/payment-input/payment-input.module';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

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
        TabModule,
        PaymentInputModule,
        NumericTextBoxModule,
        DropDownListModule,
    ],
    providers: [RepairVoucherGeneratorService],
})
export class RepairUpdateModule {}

import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { NgModule } from '@angular/core';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { PaymentInputModule } from '@components/payment-input/payment-input.module';
import { PaymentMethodSelectorModule } from '@components/payment-method-selector/payment-method-selector.module';
import { RepairUpdateComponent } from '@pages/repair-dashboard/repair-update/repair-update.component';
import { RepairUpdateRoutingModule } from './repair-update-routing.module';
import { RepairVoucherGeneratorService } from '@pages/repair-dashboard/repair-voucher-generator.service';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
    declarations: [RepairUpdateComponent],
    imports: [
        CheckBoxModule,
        CommonModule,
        DropDownListModule,
        FormsModule,
        GridModule,
        NumericTextBoxModule,
        PaymentInputModule,
        PaymentMethodSelectorModule,
        ReactiveFormsModule,
        RepairUpdateRoutingModule,
        TabModule,
    ],
    providers: [RepairVoucherGeneratorService],
})
export class RepairUpdateModule {}

import { CashUpdateComponent } from './cash-update.component';
import { CashUpdateResolverService } from '@management-view/cash-dashboard/cash-update/cash-update-resolver.service';
import { CashUpdateRoutingModule } from './cash-update-routing.module';
import { CommonModule } from '@angular/common';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaymentMethodSelectorModule } from '@components/payment-method-selector/payment-method-selector.module';

@NgModule({
    declarations: [CashUpdateComponent],
    imports: [
        CommonModule,
        CashUpdateRoutingModule,
        DateTimePickerModule,
        DropDownListModule,
        FormsModule,
        ReactiveFormsModule,
        PaymentMethodSelectorModule,
    ],
    providers: [CashUpdateResolverService],
})
export class CashUpdateModule {}

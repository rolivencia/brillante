import { Component, Input } from '@angular/core';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { UntypedFormGroup } from '@angular/forms';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'app-payment-method-selector',
    templateUrl: './payment-method-selector.component.html',
    styleUrls: ['./payment-method-selector.component.scss'],
})
export class PaymentMethodSelectorComponent {
    @Input() id: string;
    @Input() label: string = 'Método de pago';
    @Input() isReadOnly: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() formGroup: UntypedFormGroup;

    public paymentMethodFields: FieldSettingsModel = { text: 'description', value: 'id' };

    onChange = (_: any) => {};
    onTouch = () => {};

    constructor(public paymentMethodsService: PaymentMethodsService) {}
}

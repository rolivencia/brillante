import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { PaymentMethod } from '@models/cash-transaction';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'app-payment-input',
    templateUrl: './payment-input.component.html',
    styleUrls: ['./payment-input.component.scss'],
})
export class PaymentInputComponent implements OnInit {
    @Input() methodLabel: string = 'Método de Pago';
    @Input() amountLabel: string = 'Monto';
    @Input() dateLabel: string = 'Fecha';
    @Input() form: FormGroup;

    @Input() disabled: boolean = false;

    get id(): FormControl {
        return this.form.get('id') as FormControl;
    }
    get date(): FormControl {
        return this.form.get('date') as FormControl;
    }

    public data: PaymentMethod[] = [];
    public fields: FieldSettingsModel = { text: 'description', value: 'id' };

    constructor(public paymentMethodsService: PaymentMethodsService) {}

    ngOnInit(): void {
        this.data = this.paymentMethodsService.paymentMethods;
        this.disabled = this.id.value ? true : this.disabled;
    }
}

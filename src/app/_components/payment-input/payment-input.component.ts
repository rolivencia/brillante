import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { PaymentMethod } from '@models/cash-transaction';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'app-payment-input',
    templateUrl: './payment-input.component.html',
    styleUrls: ['./payment-input.component.scss'],
})
export class PaymentInputComponent implements OnInit {
    @Input() index: number = 0;
    @Input() methodLabel: string = 'Método de Pago';
    @Input() amountLabel: string = 'Monto';
    @Input() dateLabel: string = 'Fecha';
    @Input() form: UntypedFormGroup;
    @Input() disabled: boolean = false;

    @Output() remove: EventEmitter<any> = new EventEmitter<any>();

    get id(): UntypedFormControl {
        return this.form.get('id') as UntypedFormControl;
    }
    get date(): UntypedFormControl {
        return this.form.get('date') as UntypedFormControl;
    }

    public data: PaymentMethod[] = [];
    public fields: FieldSettingsModel = { text: 'description', value: 'id' };

    constructor(public paymentMethodsService: PaymentMethodsService) {}

    ngOnInit(): void {
        this.data = this.paymentMethodsService.paymentMethods;
        this.disabled = this.id.value ? true : this.disabled;
    }

    onRemove() {
        this.remove.emit({ index: this.index });
    }
}

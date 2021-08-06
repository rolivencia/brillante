import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { PaymentMethodsService } from '@app/_services/payment-methods.service';
import { PaymentMethod } from '@app/_models/cash-transaction';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as wjInput from '@grapecity/wijmo.angular2.input';

@Component({
    selector: 'app-payment-method-selector',
    templateUrl: './payment-method-selector.component.html',
    styleUrls: ['./payment-method-selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => PaymentMethodSelectorComponent),
        },
    ],
})
export class PaymentMethodSelectorComponent implements ControlValueAccessor, OnInit {
    @Input() id: string;
    @Input() label: string = 'Método de pago';
    @Input() isReadOnly: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() selectedItem: PaymentMethod;
    @Input() selectedIndex: number;

    @ViewChild('combobox') combobox: wjInput.WjComboBox;

    onChange = (_: any) => {};
    onTouch = () => {};

    constructor(public paymentMethodsService: PaymentMethodsService) {}

    ngOnInit(): void {}

    selectedItemChanged(selectedItem: PaymentMethod) {
        this.selectedItem = selectedItem;
        this.onTouch();
        this.onChange(this.selectedItem);
    }

    writeValue(value: any) {
        this.selectedItem = value;
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@models/product';
import { PaymentMethod } from '@models/cash-transaction';
import { decimalsSeparator, replaceDotWithComma } from '@functions/numeric-utils';
import { PaymentMethodsService } from '@services/payment-methods.service';

@Component({
    selector: 'app-product-thumbnail',
    templateUrl: './product-thumbnail.component.html',
    styleUrls: ['./product-thumbnail.component.scss'],
})
export class ProductThumbnailComponent implements OnInit {
    @Input() product: Product;
    @Input() paymentMethods: PaymentMethod[] = [];

    constructor(private paymentMethodsService: PaymentMethodsService) {}

    ngOnInit(): void {}

    priceGenerationParser(price: number, installments: number = 1) {
        //TODO: Try to define the credit reference based on an enum or other way
        const creditReference: PaymentMethod = this.paymentMethods
            .filter((paymentMethod) => paymentMethod.description === 'LaPos Crédito')
            .pop();
        const interestRate = creditReference.installments.filter((x) => x.installments === installments).pop()
            .interestRate;
        const installmentPrice = ((price / installments) * (1 + interestRate)).toFixed(2);
        return decimalsSeparator(replaceDotWithComma(installmentPrice));
    }
}

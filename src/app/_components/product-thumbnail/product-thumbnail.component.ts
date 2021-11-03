import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@models/product';
import { PaymentMethod } from '@models/cash-transaction';
import { PaymentMethodsService } from '@services/payment-methods.service';

@Component({
    selector: 'app-product-thumbnail',
    templateUrl: './product-thumbnail.component.html',
    styleUrls: ['./product-thumbnail.component.scss'],
})
export class ProductThumbnailComponent implements OnInit {
    @Input() product: Product;
    @Input() paymentMethods: PaymentMethod[] = [];

    public $fullPrice;
    public $installmentsPrice;

    constructor(public paymentMethodsService: PaymentMethodsService) {}

    ngOnInit(): void {
        this.$fullPrice = this.paymentMethodsService.getPriceWithAppliedFee(this.product.price);
        this.$installmentsPrice = this.paymentMethodsService.getPriceWithAppliedFee(this.product.price, 12);
    }
}

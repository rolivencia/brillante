import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@models/product';
import { faCartPlus, faCreditCard, faExclamationTriangle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    public faCart: IconDefinition = faCartPlus;
    public faCreditCard: IconDefinition = faCreditCard;
    public faExclamationTriangle: IconDefinition = faExclamationTriangle;
    public product: Product;

    public highlightedImageUrl: string = '';

    public $fullPrice: Observable<string>;
    public $installmentsPrice: Observable<string>;

    constructor(private paymentMethodsService: PaymentMethodsService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        if (this.route.snapshot.data['product']) {
            this.product = this.route.snapshot.data['product'];
            this.highlightedImageUrl = this.product.imageUrls[0];
            this.$fullPrice = this.paymentMethodsService.getPriceWithAppliedFee(this.product.price);
            this.$installmentsPrice = this.paymentMethodsService.getPriceWithAppliedFee(this.product.price, 12);
        }
    }

    setImage(imageUrl: string) {
        this.highlightedImageUrl = imageUrl;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@models/product';
import { faCartPlus, faCreditCard, faExclamationTriangle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { Observable } from 'rxjs';
import { CartService } from '@services/cart.service';
import { AuthenticationService } from '@services/authentication.service';

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
    public quantity: number = 1;

    public highlightedImageUrl: string = '';

    public $fullPrice: Observable<string>;
    public $installmentsPrice: Observable<string>;

    public showCart: boolean = true; // TODO: Remove this when cart module is ready

    constructor(
        private authenticationService: AuthenticationService,
        private cartService: CartService,
        private paymentMethodsService: PaymentMethodsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.data['product']) {
            this.product = this.route.snapshot.data['product'];
            this.highlightedImageUrl = this.product.imageUrls[0];
            this.$fullPrice = this.paymentMethodsService.getPriceWithAppliedFee(this.product.price);
            this.$installmentsPrice = this.paymentMethodsService.getPriceWithAppliedFee(this.product.price, 12);
        }
        this.authenticationService.currentUser.subscribe((value) => {
            this.showCart = !!value;
        });
    }

    addToCart() {
        this.cartService.add(this.product, this.quantity);
        this.router.navigate(['products/cart']);
    }

    setImage(imageUrl: string) {
        this.highlightedImageUrl = imageUrl;
    }
}

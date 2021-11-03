import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@models/product';
import { ProductsService } from '@customer-view/products/products.service';
import { Subscription } from 'rxjs';
import { faChevronLeft, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PaymentMethod } from '@models/cash-transaction';
import { PaymentMethodsService } from '@services/payment-methods.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
    public count: number;
    public products: Product[] = [];
    public pages: number[] = [1];

    private routeSubscription: Subscription;

    public faChevronLeft: IconDefinition = faChevronLeft;
    public faChevronRight: IconDefinition = faChevronRight;

    public paymentMethods: PaymentMethod[] = [];

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private paymentMethodsService: PaymentMethodsService,
        public productsService: ProductsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.routeSubscription = this.route.paramMap.subscribe((values) => {
            if (this.route.snapshot.data['products']) {
                // Product count, given the current category/manufacturer filters
                this.count = parseInt(this.route.snapshot.data['products'].count, 10);

                // Assign values to mark active filters (category, manufacturer, page)
                this.productsService.currentOffset = parseInt(values['params'].offset, 10);
                this.productsService.currentCategory = values['params'].category;
                this.productsService.currentManufacturer = values['params'].manufacturer;

                this.products = this.route.snapshot.data['products'].products;
                const count = Math.ceil(this.route.snapshot.data['products'].count / 12.0);
                this.pages = Array.from({ length: count }, (_, i) => i + 1);
                this.changeDetectorRef.detectChanges();
            }

            this.paymentMethods = this.paymentMethodsService.paymentMethods;
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    addToCart(id: number) {
        console.log('IMPLEMENT ADDTOCART METHOD');
    }

    productOffsetCount() {
        const min = 12 * (this.productsService.currentOffset - 1) + 1;
        let max = 12 + (this.productsService.currentOffset - 1) * 12;
        if (max > this.count && this.pages.length === this.productsService.currentOffset) {
            max = this.count;
        }

        return `${min} - ${max}`;
    }
}

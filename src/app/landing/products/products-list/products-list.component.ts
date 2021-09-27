import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@app/_models/product';
import { ProductsService } from '@app/landing/products/products.service';
import { Subscription } from 'rxjs';
import { decimalsSeparator, replaceDotWithComma } from '@app/_functions/numeric-utils';
import { faChevronLeft, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
    public products: Product[] = [];
    public pages: number[] = [1];

    private routeSubscription: Subscription;

    public faChevronLeft: IconDefinition = faChevronLeft;
    public faChevronRight: IconDefinition = faChevronRight;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private productsService: ProductsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.routeSubscription = this.route.paramMap.subscribe((values) => {
            if (this.route.snapshot.data['products']) {
                // Assign values to mark active filters (category, manufacturer, page)
                this.productsService.currentOffset = parseInt(values['params'].offset, 10);
                this.productsService.currentCategory = values['params'].category;
                this.productsService.currentManufacturer = values['params'].manufacturer;

                this.products = this.route.snapshot.data['products'].products;
                const count = Math.ceil(this.route.snapshot.data['products'].count / 12.0);
                this.pages = Array.from({ length: count }, (_, i) => i + 1);
                this.changeDetectorRef.detectChanges();
            }
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    addToCart(id: number) {
        console.log('IMPLEMENT ADDTOCART METHOD');
    }

    priceGenerationParser(x: number | string) {
        return decimalsSeparator(replaceDotWithComma(x));
    }
}

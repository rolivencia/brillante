import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@models/product';
import { ProductsService } from '@customer-view/products/products.service';
import { combineLatest, Subscription } from 'rxjs';
import {
    faChevronLeft,
    faChevronRight,
    faSearch,
    faSlidersH,
    faTimes,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { PaymentMethod } from '@models/cash-transaction';
import { PaymentMethodsService } from '@services/payment-methods.service';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ChangedEventArgs } from '@syncfusion/ej2-inputs';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
    @ViewChild('sidebar') sidebar: SidebarComponent;

    public count: number;
    public products: Product[] = [];
    public displayProducts: Product[] = [];
    public pages: number[] = [1];

    private routeSubscription: Subscription;

    public faTimes: IconDefinition = faTimes;
    public faChevronLeft: IconDefinition = faChevronLeft;
    public faChevronRight: IconDefinition = faChevronRight;
    public faSlider: IconDefinition = faSlidersH;
    public faSearch: IconDefinition = faSearch;

    public paymentMethods: PaymentMethod[] = [];

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private paymentMethodsService: PaymentMethodsService,
        public productsService: ProductsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.routeSubscription = combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(
            ([values, queryParams]) => {
                if (this.route.snapshot.data['products']) {
                    // Product count, given the current category/manufacturer filters
                    this.count = parseInt(this.route.snapshot.data['products'].count, 10);

                    // Assign values to mark active filters (category, manufacturer, page)
                    this.productsService.currentOffset = parseInt(values['params'].offset, 10);
                    this.productsService.currentCategory = values['params'].category;
                    this.productsService.currentManufacturer = values['params'].manufacturer;
                    this.productsService.currentQueryParams = queryParams;

                    this.products = this.route.snapshot.data['products'].products;

                    const count = Math.ceil(this.route.snapshot.data['products'].count / 12.0);
                    this.pages = Array.from({ length: count }, (_, i) => i + 1);
                    this.changeDetectorRef.detectChanges();
                }

                this.paymentMethods = this.paymentMethodsService.paymentMethods;
            }
        );
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    public addToCart(id: number) {
        console.log('IMPLEMENT ADDTOCART METHOD');
    }

    public productOffsetCount() {
        const min = 12 * (this.productsService.currentOffset - 1) + 1;
        let max = 12 + (this.productsService.currentOffset - 1) * 12;
        if (max > this.count && this.pages.length === this.productsService.currentOffset) {
            max = this.count;
        }

        return `${min} - ${max}`;
    }

    public goToProductDetail(product: Product) {
        this.router.navigate([`/products/product-detail/${product.id}`]);
    }

    public onCreated() {
        this.sidebar.element.style.visibility = '';
    }

    public toggleSidebar() {
        this.sidebar.toggle();
    }

    public onSearchTextChange(event: ChangedEventArgs) {
        this.router.navigate([`/products`], { queryParams: { search: event.value }, queryParamsHandling: 'merge' });
    }
}

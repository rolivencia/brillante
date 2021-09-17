import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@app/_models/product';
import { ProductsService } from '@app/landing/products/products.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
    public products: Product[] = [];

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private productsService: ProductsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.data['products']) {
            this.products = this.route.snapshot.data['products'];
            this.changeDetectorRef.detectChanges();
        }
    }

    addToCart(id: number) {
        console.log('IMPLEMENT ADDTOCART METHOD');
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@app/_models/product';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
    public products: Product[] = [];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        if (this.route.snapshot.data['products']) {
            this.products = this.route.snapshot.data['products'];
        }
    }

    addToCart(id: number) {
        console.log('IMPLEMENT ADDTOCART METHOD');
    }
}

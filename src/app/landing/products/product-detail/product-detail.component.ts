import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@app/_models/product';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    public product: Product;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        if (this.route.snapshot.data['product']) {
            this.product = this.route.snapshot.data['product'];
        }
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { Product } from '@models/product';

@Component({
    selector: 'app-featured-products',
    templateUrl: './featured-products.component.html',
    styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
    @Input() products: Product[] = [];
    public productsCarousel: OwlOptions = {
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                stagePadding: 40,
            },
            400: {
                nav: false,
                items: 1,
                margin: 10,
            },
            768: {
                nav: true,
                items: 3,
            },
            1000: {
                items: 3,
            },
        },
    };

    constructor() {}

    ngOnInit(): void {}
}

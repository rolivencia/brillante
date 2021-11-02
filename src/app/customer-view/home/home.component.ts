import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Product } from '@models/product';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    heroImage: OwlOptions = {
        loop: true,
        margin: 10,
        items: 1,
        nav: false,
        autoplay: true,
        autoWidth: true,
    };

    public featuredProducts: Product[] = [];
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        if (this.route.snapshot.data['featuredProducts']) {
            this.featuredProducts = this.route.snapshot.data['featuredProducts'];
        }
    }
}

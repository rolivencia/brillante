import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@models/product';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { Observable } from 'rxjs';
import { ProductsHttpService } from '@customer-view/products/products.http.service';

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

    public featuredProducts$: Observable<Product[]>;
    constructor(private route: ActivatedRoute, private productsHttpService: ProductsHttpService) {}

    ngOnInit() {
        this.featuredProducts$ = this.productsHttpService.getFeatured();
    }
}

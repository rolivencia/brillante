import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '@models/product';
import { ProductsHttpService } from '@customer-view/products/products.http.service';

@Injectable({
    providedIn: 'root',
})
export class FeaturedProductsResolverService implements Resolve<Observable<Product[]>> {
    constructor(private productsService: ProductsHttpService) {}

    resolve(): Observable<Product[]> {
        return this.productsService.getFeatured();
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsHttpService } from '@app/landing/products/products.http.service';
import { Product } from '@app/_models/product';

@Injectable({
    providedIn: 'root',
})
export class ProductsListResolverService implements Resolve<Product[]> {
    constructor(private productsHttpService: ProductsHttpService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        return this.productsHttpService.getAll();
    }
}

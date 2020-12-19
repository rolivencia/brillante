import { Injectable } from '@angular/core';
import { Product } from '@app/landing/products/products-list/products-list.component';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '@app/landing/products/products.service';

@Injectable({
    providedIn: 'root',
})
export class ProductsListResolverService implements Resolve<Product[]> {
    constructor(private productsService: ProductsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        return this.productsService.getAll();
    }
}

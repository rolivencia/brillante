import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductsHttpService } from '@customer-view/products/products.http.service';
import { Product } from '@models/product';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductsListResolverService implements Resolve<Product[]> {
    constructor(private productsHttpService: ProductsHttpService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        const offset = route.params['offset'];
        const manufacturer = route.params['manufacturer'];
        const category = route.params['category'];
        const searchText = route.queryParams.search;
        return this.productsHttpService.get({ offset, manufacturer, category, searchText });
    }
}

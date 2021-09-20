import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductsHttpService } from '@app/landing/products/products.http.service';
import { Product } from '@app/_models/product';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProductsListResolverService implements Resolve<Product[]> {
    constructor(private productsHttpService: ProductsHttpService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        const offset = route.params['offset'];
        const manufacturer = route.params['manufacturer'];
        const category = route.params['category'];
        return this.productsHttpService.get({ offset, manufacturer, category });
    }
}

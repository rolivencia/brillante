import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductsHttpService } from '@app/landing/products/products.http.service';
import { Category, Manufacturer, Product } from '@app/_models/product';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductsListResolverService implements Resolve<Product[]> {
    constructor(private productsHttpService: ProductsHttpService, private route: ActivatedRoute) {}

    resolve(): Observable<Product[]> {
        return this.productsHttpService.getAll();
    }
}

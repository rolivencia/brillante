import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsHttpService } from '@customer-view/products/products.http.service';
import { Product } from '@models/product';

@Injectable({
    providedIn: 'root',
})
export class ProductDetailResolverService implements Resolve<Product> {
    constructor(private productsHttpService: ProductsHttpService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        const id: string = route.paramMap.get('id');
        return this.productsHttpService.getById(id);
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductsHttpService } from '@app/landing/products/products.http.service';
import { Category, Manufacturer, Product } from '@app/_models/product';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class ProductsListResolverService
    implements Resolve<{ list: Product[]; categories: Category[]; manufacturers: Manufacturer[] }> {
    constructor(private productsHttpService: ProductsHttpService) {}

    async resolve(
        route: ActivatedRouteSnapshot
    ): Promise<{ list: Product[]; categories: Category[]; manufacturers: Manufacturer[] }> {
        const products = await this.productsHttpService.getAll().toPromise();
        const categories = _.uniqBy(products.map((product) => product.categories).flat(), 'id');
        const manufacturers = _.uniqBy(
            products.map((product) => product.manufacturer),
            'id'
        );

        return new Promise((resolve, reject) => {
            if (products) {
                resolve({ list: products, categories, manufacturers });
            } else {
                console.error(Error);
                reject(Error);
            }
        });
    }
}

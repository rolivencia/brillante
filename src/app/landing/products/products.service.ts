import { Injectable } from '@angular/core';
import { Category, Manufacturer, Product } from '@app/_models/product';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    public manufacturers: Manufacturer[] = [];
    public categories: Category[] = [];

    public listFilters: ListFilters = new ListFilters();

    constructor(private router: Router) {}

    generatePageRoute(page?: string | number, manufacturer?: string, category?: string) {
        if (page) {
            this.listFilters.offset = page;
        }
        if (manufacturer) {
            this.listFilters.manufacturer = manufacturer;
        }
        if (category) {
            this.listFilters.category = category;
        }

        this.router.navigate([
            `/products/products-list/${this.listFilters.offset}/${this.listFilters.manufacturer}/${this.listFilters.category}`,
        ]);
    }
}

export function toProduct(productDTO): Product {
    return new Product({ ...productDTO });
}

class ListFilters {
    offset: number | string;
    manufacturer: string;
    category: string;

    constructor() {
        this.offset = 1;
        this.manufacturer = 'all';
        this.category = 'all';
    }
}

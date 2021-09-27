import { Injectable } from '@angular/core';
import { Category, Manufacturer, Product } from '@app/_models/product';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    get currentOffset(): number {
        return this._currentOffset;
    }

    set currentOffset(value: number) {
        this._currentOffset = value;
    }

    get currentCategory(): string {
        return this._currentCategory;
    }

    set currentCategory(value: string) {
        this._currentCategory = value;
    }

    get currentManufacturer(): string {
        return this._currentManufacturer;
    }

    set currentManufacturer(value: string) {
        this._currentManufacturer = value;
    }
    public manufacturers: Manufacturer[] = [];
    public categories: Category[] = [];

    // Filters
    private _currentOffset: number = 1;
    private _currentCategory: string = 'all';
    private _currentManufacturer: string = 'all';

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

        return `/products/products-list/${this.listFilters.offset}/${this.listFilters.manufacturer}/${this.listFilters.category}`;
    }

    navigateToPageRoute(page?: string | number): string {
        if (page) {
            this.listFilters.offset = page;
        }
        return `/products/products-list/${this.listFilters.offset}/${this._currentManufacturer}/${this._currentCategory}`;
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

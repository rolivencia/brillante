import { Injectable } from '@angular/core';
import { Category, Manufacturer, Product } from '@models/product';
import { ParamMap, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    get currentQueryParams(): ParamMap {
        return this._currentQueryParams;
    }

    set currentQueryParams(value: ParamMap) {
        this._currentQueryParams = value;
    }
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
    private _currentQueryParams: ParamMap = null;

    public listFilters: ListFilters = new ListFilters();

    constructor(private router: Router) {}

    public generatePageRoute(page?: string | number, manufacturer?: string, category?: string) {
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

    public navigateToPageRoute(page?: string | number): string {
        if (page) {
            this.listFilters.offset = page;
        }
        return `/products/products-list/${this.listFilters.offset}/${this._currentManufacturer}/${this._currentCategory}`;
    }

    public navigateToPrevious() {
        if (this.listFilters.offset > 1) {
            this.router.navigate(
                [
                    `/products/products-list/${(this._currentOffset as number) - 1}/${this._currentManufacturer}/${
                        this._currentCategory
                    }`,
                ],
                { queryParams: this._currentQueryParams['params'] }
            );
        }
    }

    public navigateToNext(max: number) {
        if (this.listFilters.offset < max) {
            this.router.navigate(
                [
                    `/products/products-list/${(this._currentOffset as number) + 1}/${this._currentManufacturer}/${
                        this._currentCategory
                    }`,
                ],
                { queryParams: this._currentQueryParams['params'] }
            );
        }
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

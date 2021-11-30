import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@customer-view/products/products.service';

@Component({
    selector: 'app-products-filters',
    templateUrl: './products-filters.component.html',
    styleUrls: ['./products-filters.component.scss'],
})
export class ProductsFiltersComponent implements OnInit {
    constructor(public productsService: ProductsService) {}

    ngOnInit(): void {}
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '@customer-view/products/products.service';

@Component({
    selector: 'app-products-filters',
    templateUrl: './products-filters.component.html',
    styleUrls: ['./products-filters.component.scss'],
})
export class ProductsFiltersComponent implements OnInit {
    @Output() pickedFilter: EventEmitter<string> = new EventEmitter<string>();
    constructor(public productsService: ProductsService) {}

    ngOnInit(): void {}

    public onFilterSelected(selectedFilter?: string) {
        this.pickedFilter.emit(selectedFilter);
    }
}

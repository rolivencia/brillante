import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ProductsService } from '@customer-view/products/products.service';
import { Router } from '@angular/router';
import { SearchInputComponent } from '@components/search-input/search-input.component';

@Component({
    selector: 'app-products-filters',
    templateUrl: './products-filters.component.html',
    styleUrls: ['./products-filters.component.scss'],
})
export class ProductsFiltersComponent implements OnInit {
    @Output() pickedFilter: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('searchBox') searchBox: SearchInputComponent;

    constructor(public productsService: ProductsService, private router: Router) {}

    ngOnInit(): void {}

    public onFilterSelected(selectedFilter?: string) {
        this.pickedFilter.emit(selectedFilter);
        this.searchBox.clear();
    }

    public onSearchSubmitted(text: string) {
        this.router.navigate([`/products`], { queryParams: { search: text } });
    }
}

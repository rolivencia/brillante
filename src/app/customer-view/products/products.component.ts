import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@customer-view/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangedEventArgs } from '@syncfusion/ej2-inputs';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router, public productsService: ProductsService) {}

    ngOnInit(): void {
        if (this.route.snapshot.data['filters']) {
            this.productsService.categories = this.route.snapshot.data['filters'].categories;
            this.productsService.manufacturers = this.route.snapshot.data['filters'].manufacturers;
        }
    }

    public onSearchTextChange(event: ChangedEventArgs) {
        this.router.navigate([`/products`], { queryParams: { search: event.value } });
    }
}

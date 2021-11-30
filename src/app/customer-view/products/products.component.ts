import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '@customer-view/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    @ViewChild('sidebar') sidebar: SidebarComponent;
    constructor(private route: ActivatedRoute, public productsService: ProductsService) {}

    ngOnInit(): void {
        if (this.route.snapshot.data['filters']) {
            this.productsService.categories = this.route.snapshot.data['filters'].categories;
            this.productsService.manufacturers = this.route.snapshot.data['filters'].manufacturers;
        }
    }

    public onCreated() {
        this.sidebar.element.style.visibility = '';
    }

    public toggleSidebar() {
        this.sidebar.toggle();
    }
}

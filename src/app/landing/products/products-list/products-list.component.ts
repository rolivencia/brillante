import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
    public products: Product[] = [];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        if (this.route.snapshot.data['products']) {
            this.products = this.route.snapshot.data['products'];
        }
    }

    addToCart(id: number) {
        console.log('IMPLEMENT ADDTOCART METHOD');
    }
}

export class Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrls: string[];
    categories: Category[];
    manufacturer: Manufacturer;

    constructor({ id, name, price, description, imageUrls, categories, manufacturer }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrls = imageUrls;
        this.categories = categories;
        this.manufacturer = manufacturer;
    }
}

export class Manufacturer {
    id: number;
    link: string;
    title: string;

    constructor({ id, link, title }) {
        this.id = id;
        this.link = link;
        this.title = title;
    }
}

export class Category {
    id: number;
    link: string;
    title: string;

    constructor({ id, link, title }) {
        this.id = id;
        this.link = link;
        this.title = title;
    }
}

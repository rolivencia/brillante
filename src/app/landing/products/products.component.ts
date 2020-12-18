import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    public manufacturers: Manufacturer[] = [
        { id: 1, title: 'Apple', link: 'apple' },
        { id: 2, title: 'Anker', link: 'anker' },
        { id: 3, title: 'Incipio', link: 'incipio' },
        { id: 4, title: 'Spigen', link: 'spigen' },
        { id: 5, title: 'Griffin', link: 'griffin' },
        { id: 6, title: 'iLuv', link: 'iluv' },
        { id: 7, title: 'Samsung', link: 'samsung' },
        { id: 8, title: 'Belkin', link: 'belkin' },
        { id: 9, title: 'Case Mate', link: 'case-mate' },
        { id: 10, title: 'Tech 21', link: 'tech-21' },
        { id: 11, title: 'Caselogy', link: 'caselogy' },
        { id: 12, title: 'Twelve South', link: 'twelve-south' },
        { id: 13, title: 'Ewtec', link: 'ewtec' },
        { id: 14, title: 'Pure Gear ', link: 'pure-gear' },
        { id: 15, title: 'Mophie', link: 'mophie' },
        { id: 16, title: 'Ringke', link: 'ringke' },
        { id: 17, title: 'JBL', link: 'jbl' },
        { id: 18, title: 'Philips', link: 'philips' },
        { id: 19, title: 'Genéricos', link: 'genericos' },
    ];

    public categories: Category[] = [
        { id: 1, title: 'Accesorios', link: 'accesorios' },
        { id: 2, title: 'Audio', link: 'audio' },
        { id: 3, title: 'Auriculares', link: 'auriculares' },
        { id: 4, title: 'Cables', link: 'cables' },
        { id: 5, title: 'Cargadores', link: 'cargadores' },
        { id: 6, title: 'Fundas', link: 'fundas' },
        { id: 7, title: '¡Precios Regalados!', link: 'ofertas' },
        { id: 8, title: 'Templados', link: 'templados' },
    ];

    public products: Product[] = [
        {
            id: 1,
            name: '3D Samsung S8',
            price: 950,
            description: '',
            imageUrls: ['assets/imagenes-s/productos/productos-imagen-226.png'],
            categories: [{ id: 1, title: 'Templados', link: 'templados' }],
            manufacturer: { id: 7, title: 'Samsung', link: 'samsung' },
        },
        {
            id: 2,
            name: '5D iPhone 7 Plus/8 Plus',
            price: 950,
            description: '',
            imageUrls: ['assets/imagenes-s/productos/productos-imagen-225.png'],
            categories: [{ id: 1, title: 'Templados', link: 'templados' }],
            manufacturer: { id: 1, title: 'Apple', link: 'apple' },
        },
        {
            id: 3,
            name: '5D iPhone 7/8',
            price: 850,
            description: '',
            imageUrls: ['assets/imagenes-s/productos/productos-imagen-224.png'],
            categories: [{ id: 1, title: 'Templados', link: 'templados' }],
            manufacturer: { id: 1, title: 'Apple', link: 'apple' },
        },
    ];

    constructor() {}

    ngOnInit() {}

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

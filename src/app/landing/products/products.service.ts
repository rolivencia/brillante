import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Manufacturer, Product } from '@app/_models/product';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
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

    constructor() {}
}

export function toProduct(productDTO): Product {
    return new Product({ ...productDTO });
}

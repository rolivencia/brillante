import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProductsComponent } from './featured-products.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
    declarations: [FeaturedProductsComponent],
    imports: [CommonModule, CarouselModule],
    exports: [FeaturedProductsComponent],
})
export class FeaturedProductsModule {}

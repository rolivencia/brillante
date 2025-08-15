import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProductsComponent } from './featured-products.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductThumbnailModule } from '../product-thumbnail/product-thumbnail.module';

@NgModule({
    declarations: [FeaturedProductsComponent],
    imports: [CommonModule, CarouselModule, ProductThumbnailModule],
    exports: [FeaturedProductsComponent],
})
export class FeaturedProductsModule {}

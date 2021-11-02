import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FeaturedProductsModule } from '../../_components/featured-products/featured-products.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, FeaturedProductsModule, CarouselModule],
})
export class HomeModule {}

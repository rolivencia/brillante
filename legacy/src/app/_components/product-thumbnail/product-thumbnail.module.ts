import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductThumbnailComponent } from './product-thumbnail.component';

@NgModule({
    declarations: [ProductThumbnailComponent],
    imports: [CommonModule],
    exports: [ProductThumbnailComponent],
})
export class ProductThumbnailModule {}

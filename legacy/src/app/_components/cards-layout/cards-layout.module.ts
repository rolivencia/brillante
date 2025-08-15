import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsLayoutComponent } from './cards-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [CardsLayoutComponent],
    exports: [CardsLayoutComponent],
    imports: [CommonModule, RouterModule]
})
export class CardsLayoutModule {}

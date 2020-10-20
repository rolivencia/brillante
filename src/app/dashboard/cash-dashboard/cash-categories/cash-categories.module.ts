import { CashCategoriesComponent } from './cash-categories.component';
import { CashCategoriesRoutingModule } from './cash-categories-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';

@NgModule({
    declarations: [CashCategoriesComponent],
    imports: [CommonModule, CashCategoriesRoutingModule, FormsModule, WjInputModule],
})
export class CashCategoriesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashAddNewRoutingModule } from './cash-add-new-routing.module';
import { CashAddNewComponent } from './cash-add-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

@NgModule({
    declarations: [CashAddNewComponent],
    imports: [CommonModule, CashAddNewRoutingModule, FormsModule, ReactiveFormsModule, WjInputModule],
})
export class CashAddNewModule {}

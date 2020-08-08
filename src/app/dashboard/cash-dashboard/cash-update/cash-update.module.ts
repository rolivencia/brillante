import { CashUpdateComponent } from './cash-update.component';
import { CashUpdateRoutingModule } from './cash-update-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

@NgModule({
    declarations: [CashUpdateComponent],
    imports: [CommonModule, CashUpdateRoutingModule, FormsModule, ReactiveFormsModule, WjInputModule],
})
export class CashUpdateModule {}

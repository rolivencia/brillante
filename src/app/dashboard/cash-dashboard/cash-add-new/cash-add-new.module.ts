import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashAddNewRoutingModule } from './cash-add-new-routing.module';
import { CashAddNewComponent } from './cash-add-new.component';


@NgModule({
  declarations: [CashAddNewComponent],
  imports: [
    CommonModule,
    CashAddNewRoutingModule
  ]
})
export class CashAddNewModule { }

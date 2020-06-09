import { CashDashboardRoutingModule } from './cash-dashboard-routing.module';
import { CashDashboardComponent } from './cash-dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { CashFormHandlerService } from '@app/dashboard/cash-dashboard/cash-form-handler.service';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

@NgModule({
    declarations: [CashDashboardComponent],
    imports: [CommonModule, CashDashboardRoutingModule, FormsModule, NgbDatepickerModule, ReactiveFormsModule, WjGridModule, WjInputModule],
    providers: [CashFormHandlerService]
})
export class CashDashboardModule {}

import { CashReportComponent } from './cash-report.component';
import { CashReportRoutingModule } from './cash-report-routing.module';
import { CashReportService } from './cash-report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

@NgModule({
    declarations: [CashReportComponent],
    imports: [CommonModule, CashReportRoutingModule, FormsModule, NgbDatepickerModule, WjGridModule],
    providers: [CashReportService],
})
export class CashReportModule {}

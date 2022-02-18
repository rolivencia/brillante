import { CashReportComponent } from './cash-report.component';
import { CashReportRoutingModule } from './cash-report-routing.module';
import { CashReportService } from './cash-report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { AggregateService, GridModule } from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
    declarations: [CashReportComponent],
    imports: [
        CommonModule,
        CashReportRoutingModule,
        FormsModule,
        GridModule,
        NgbDatepickerModule,
        WjGridFilterModule,
        WjGridModule,
        DropDownListModule,
    ],
    providers: [CashReportService],
})
export class CashReportModule {}

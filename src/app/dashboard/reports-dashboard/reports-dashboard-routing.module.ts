import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsDashboardComponent } from './reports-dashboard.component';

const routes: Routes = [{ path: '', component: ReportsDashboardComponent, children: [] }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportsDashboardRoutingModule {}

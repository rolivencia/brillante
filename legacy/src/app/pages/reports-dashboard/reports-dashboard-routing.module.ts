import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsDashboardComponent } from './reports-dashboard.component';
import { CashDashboardResolverService } from '../cash-dashboard/cash-dashboard.resolver.service';
import { ReportsDashboardGuard } from '@pages/reports-dashboard/_guards/reports-dashboard.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [ReportsDashboardGuard],
        children: [
            {
                path: '',
                component: ReportsDashboardComponent,
            },
            {
                path: 'cash-report',
                loadChildren: () =>
                    import('../reports-dashboard/cash-report/cash-report.module').then((m) => m.CashReportModule),
                resolve: {
                    concepts: CashDashboardResolverService,
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportsDashboardRoutingModule {}

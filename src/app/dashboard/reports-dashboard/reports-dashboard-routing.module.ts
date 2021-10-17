import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsDashboardComponent } from './reports-dashboard.component';
import { CashDashboardResolverService } from '../cash-dashboard/cash-dashboard.resolver.service';
import { CashRolesGuard } from '../../_services/cash-roles-guard.service';

const routes: Routes = [
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
        canActivate: [CashRolesGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportsDashboardRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairDashboardComponent } from '@pages/repair-dashboard/repair-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: RepairDashboardComponent,
        children: [],
    },
    {
        path: 'manage',
        loadChildren: () => import('./repair-manage/repair-manage.module').then((m) => m.RepairManageModule),
    },
    {
        path: 'add',
        loadChildren: () => import('./repair-add-new/repair-add-new.module').then((m) => m.RepairAddNewModule),
    },
    {
        path: 'update',
        loadChildren: () => import('./repair-update/repair-update.module').then((m) => m.RepairUpdateModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RepairDashboardRoutingModule {}

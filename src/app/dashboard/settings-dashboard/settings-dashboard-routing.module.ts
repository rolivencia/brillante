import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsDashboardComponent } from './settings-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsDashboardComponent,
    },
    {
        path: 'office-branches',
        loadChildren: () => import('./office-branches/office-branches.module').then((m) => m.OfficeBranchesModule),
    },
    {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then((m) => m.UserManagementModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsDashboardRoutingModule {}

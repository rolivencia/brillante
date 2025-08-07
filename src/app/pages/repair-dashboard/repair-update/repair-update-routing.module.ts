import { NgModule } from '@angular/core';
import { RepairUpdateComponent } from '@pages/repair-dashboard/repair-update/repair-update.component';
import { RepairUpdateResolverService } from '@pages/repair-dashboard/repair-update/repair-update-resolver.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: ':id',
        component: RepairUpdateComponent,
        resolve: {
            repair: RepairUpdateResolverService,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RepairUpdateRoutingModule {}

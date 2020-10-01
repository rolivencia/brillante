import { CashUpdateComponent } from '@app/dashboard/cash-dashboard/cash-update/cash-update.component';
import { CashUpdateResolverService } from '@app/dashboard/cash-dashboard/cash-update/cash-update-resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: ':id',
        component: CashUpdateComponent,
        resolve: {
            //FIXME: Cambiar cuando reciba objetos cashTransaction desde nueva API de NodeJS
            cashTransaction: CashUpdateResolverService,
        },
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CashUpdateRoutingModule {}

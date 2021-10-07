import { Component, OnInit } from '@angular/core';
import { OfficeBranchService } from '@app/_services/office-branch.service';
import { OfficeBranch } from '@app/_models/office-branch';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-office-branches',
    templateUrl: './office-branches.component.html',
    styleUrls: ['./office-branches.component.scss'],
})
export class OfficeBranchesComponent implements OnInit {
    public officeBranches: OfficeBranch[] = [];
    public selectedBranch: OfficeBranch = new OfficeBranch();
    constructor(public officeBranchService: OfficeBranchService, private toastrService: ToastrService) {}

    ngOnInit(): void {
        this.officeBranchService
            .fetch()
            .pipe(first())
            .subscribe((branches) => {
                this.officeBranches = branches;
                this.selectedBranch = this.officeBranchService.current.value
                    ? this.officeBranchService.current.value
                    : branches[0];
            });
    }

    assign(selectedBranch) {
        this.officeBranchService.assign(selectedBranch);
        this.toastrService.success(`Sucursal ${selectedBranch.name} asignada correctamente.`);
    }
}

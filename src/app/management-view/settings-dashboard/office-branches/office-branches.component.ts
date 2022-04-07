import { Component, OnInit } from '@angular/core';
import { OfficeBranchService } from '@services/office-branch.service';
import { OfficeBranch } from '@models/office-branch';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-office-branches',
    templateUrl: './office-branches.component.html',
    styleUrls: ['./office-branches.component.scss'],
})
export class OfficeBranchesComponent implements OnInit {
    public form: FormGroup;
    public officeBranchFields: FieldSettingsModel = { text: 'name', value: 'id' };

    public officeBranches: OfficeBranch[] = [];
    public selectedBranch: OfficeBranch = new OfficeBranch();
    constructor(
        private formBuilder: FormBuilder,
        public officeBranchService: OfficeBranchService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.buildForm();
        this.load();
    }

    public assign() {
        const selectedIdBranch = this.form.get('idBranch').value;
        const selectedBranch = this.officeBranches.filter((o) => o.id === selectedIdBranch).pop();
        this.officeBranchService.assign(selectedBranch);
        this.toastrService.success(`Sucursal ${selectedBranch.name} asignada correctamente.`);
    }

    public buildForm() {
        this.form = this.formBuilder.group({ idBranch: [0, Validators.required] });
    }

    public load() {
        this.officeBranchService
            .fetch()
            .pipe(first())
            .subscribe((branches) => {
                this.officeBranches = branches;
                this.selectedBranch = this.officeBranchService.current.value
                    ? this.officeBranchService.current.value
                    : branches[0];
                this.form.get('idBranch').setValue(this.selectedBranch.id);
            });
    }
}

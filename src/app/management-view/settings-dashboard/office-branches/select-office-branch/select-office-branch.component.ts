import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';
import { OfficeBranch } from '@models/office-branch';
import { OfficeBranchService } from '@services/office-branch.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-select-office-branch',
    templateUrl: './select-office-branch.component.html',
    styleUrls: ['./select-office-branch.component.scss'],
})
export class SelectOfficeBranchComponent implements OnInit {
    public form: FormGroup;
    public officeBranchFields: FieldSettingsModel = { text: 'name', value: 'id' };
    public officeBranches: OfficeBranch[] = [];
    public selectedBranch: OfficeBranch = new OfficeBranch();

    constructor(
        public officeBranchService: OfficeBranchService,
        private formBuilder: FormBuilder,
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

    private buildForm() {
        this.form = this.formBuilder.group({ idBranch: [0, Validators.required] });
    }

    private load() {
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

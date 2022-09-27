import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeBranchService } from '@services/office-branch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-office-branch',
    templateUrl: './add-office-branch.component.html',
    styleUrls: ['./add-office-branch.component.scss'],
})
export class AddOfficeBranchComponent implements OnInit {
    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private officeBranchService: OfficeBranchService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
        });
    }

    onSave(event) {
        if (this.form.invalid) {
            this.toastrService.error(`Los datos ingresados son inválidos.`);
        }

        this.officeBranchService.create(this.form.value).subscribe((branch) => {
            this.toastrService.success(`Creada nueva sucursal "${branch.name}"`);
        });
    }
}

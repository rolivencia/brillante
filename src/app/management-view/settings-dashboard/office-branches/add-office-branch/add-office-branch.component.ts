import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-office-branch',
    templateUrl: './add-office-branch.component.html',
    styleUrls: ['./add-office-branch.component.scss'],
})
export class AddOfficeBranchComponent implements OnInit {
    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    onSave(event) {
        console.log(this.form.value);
    }
}

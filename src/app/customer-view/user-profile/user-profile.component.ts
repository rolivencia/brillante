import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { Observable } from 'rxjs';
import { User } from '@app/_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    public currentUser$: Observable<User>;
    public form: FormGroup;

    constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.currentUser$ = this.authenticationService.currentUser.asObservable();
        this.buildForm();
    }

    private buildForm() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dni: [null, Validators.required],
            email: ['', Validators.required],
            telephone: ['', Validators.required],
            address: ['', Validators.required],
        });
    }

    public onUpdateButtonClicked($event) {
        const userProfileForm = this.form.value;
        console.log(userProfileForm);
        //TODO: Implement this method.
    }
}

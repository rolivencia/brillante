import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { combineLatest, Observable, of } from 'rxjs';
import { User } from '@app/_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '@services/customer.service';
import { first, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    public currentUser$: Observable<User>;
    public form: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private customerService: CustomerService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.currentUser$ = this.authenticationService.currentUser.asObservable();
        this.buildForm();
        this.populateForm();
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

    private populateForm() {
        this.currentUser$
            .pipe(
                first(),
                switchMap((user) => {
                    return combineLatest([of(user), this.customerService.getByEmail(user.email)]);
                })
            )
            .subscribe(([user, customer]) => {
                this.form.controls['firstName'].setValue(user.firstName);
                this.form.controls['lastName'].setValue(user.lastName);
                this.form.controls['email'].setValue(user.email);
                if (customer) {
                    this.form.controls['dni'].setValue(customer.dni);
                    this.form.controls['telephone'].setValue(customer.telephone);
                    this.form.controls['address'].setValue(customer.address);
                }
            });
    }

    public onUpdateButtonClicked($event) {
        const userProfileForm = this.form.value;
        console.log(userProfileForm);
        //TODO: Implement this method.
    }
}

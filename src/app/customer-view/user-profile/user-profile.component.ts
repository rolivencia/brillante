import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '@app/_services';
import { combineLatest, Observable, of } from 'rxjs';
import { User } from '@app/_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '@services/customer.service';
import { first, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MaskPlaceholderModel } from '@syncfusion/ej2-calendars/src/common/maskplaceholder-model';

@Component({
    selector: 'app-register',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    public maskPlaceholderValue: MaskPlaceholderModel = { day: 'DD', month: 'MM', year: 'AAAA' };

    public currentUser$: Observable<User>;
    public form: FormGroup;
    public submitted: boolean = false;

    constructor(
        private authenticationService: AuthenticationService,
        private customerService: CustomerService,
        private formBuilder: FormBuilder,
        private toastService: ToastrService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.currentUser$ = this.authenticationService.currentUser.asObservable();
        this.buildForm();
        this.populateForm();
    }

    private buildForm() {
        this.form = this.formBuilder.group({
            avatar: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dni: [null, Validators.required],
            email: ['', Validators.required],
            telephone: ['', Validators.required],
            address: ['', Validators.required],
            birthDate: ['', Validators.required],
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
                this.form.controls['avatar'].setValue(user.avatar ? user.avatar : '');
                this.form.controls['firstName'].setValue(user.firstName);
                this.form.controls['lastName'].setValue(user.lastName);
                this.form.controls['email'].setValue(user.email);
                if (customer) {
                    this.form.controls['dni'].setValue(customer.dni);
                    this.form.controls['telephone'].setValue(customer.telephone);
                    this.form.controls['address'].setValue(customer.address);
                    this.form.controls['birthDate'].setValue(customer.birthDate);
                }
            });
    }

    public onUpdateButtonClicked(form: FormGroup) {
        this.submitted = true;
        if (form.invalid) {
            return;
        }

        const userProfileForm = form.value;

        this.userService.updateCustomerUser(
            {
                firstName: userProfileForm.firstName,
                lastName: userProfileForm.lastName,
                avatar: userProfileForm.avatar,
                userName: `${userProfileForm.firstName}_${userProfileForm.lastName}`, //FIXME: Build a username based on firstName and lastName
                email: userProfileForm.email,
            },
            {
                firstName: userProfileForm.firstName,
                lastName: userProfileForm.lastName,
                dni: userProfileForm.dni,
                telephone: userProfileForm.telephone,
                address: userProfileForm.address,
                birthDate: userProfileForm.birthDate,
                email: userProfileForm.email,
            }
        );
    }
}

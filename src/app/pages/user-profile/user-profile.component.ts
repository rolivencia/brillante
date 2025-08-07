import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '@app/_services';
import { combineLatest, Observable, of } from 'rxjs';
import { User } from '@app/_models';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { CustomerService } from '@services/customer.service';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MaskPlaceholderModel } from '@syncfusion/ej2-calendars/src/common/maskplaceholder-model';
import { Customer } from '@models/customer';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'app-register',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    public avatarUrl: string = '';
    public maskPlaceholderValue: MaskPlaceholderModel = { day: 'DD', month: 'MM', year: 'AAAA' };

    public currentUser$: Observable<User>;
    public form: FormGroup;
    public submitted: boolean = false;
    public saved: boolean = false;

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
            // avatar: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dni: [null, Validators.required],
            email: ['', Validators.required],
            telephone: ['', Validators.required],
            address: ['', Validators.required],
            birthDate: [null, { validators: [FormValidators.max(new Date()), Validators.required] }],
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
                this.avatarUrl = !!user.avatar ? user.avatar : '';
                // this.form.controls['avatar'].setValue(user.avatar ? user.avatar : '');
                this.form.controls['firstName'].setValue(user.firstName);
                this.form.controls['lastName'].setValue(user.lastName);
                this.form.controls['email'].setValue(user.email);
                if (customer) {
                    this.form.controls['dni'].setValue(customer.dni);
                    this.form.controls['telephone'].setValue(customer.telephone);
                    this.form.controls['address'].setValue(customer.address);
                    this.form.controls['birthDate'].setValue(customer.birthDate ? customer.birthDate : null);
                }

                // Assign initial value for validation of duplicated DNI
                this.form.controls['dni'].setAsyncValidators([
                    existingDniValidator(this.customerService, customer.dni),
                ]);
            });
    }

    public onUpdateButtonClicked() {
        this.submitted = true;
        // Hacky validation to avoid parent form not being updated
        if (this.form.invalid || this.form.controls['birthDate'].invalid) {
            return;
        }

        const userProfileForm = this.form.value;

        this.currentUser$
            .pipe(
                first(),
                switchMap((user) => {
                    return combineLatest([of(user), this.customerService.getByEmail(user.email)]);
                }),
                switchMap(([user, customer]) =>
                    this.userService.updateCustomerUser(
                        {
                            id: user.id,
                            firstName: userProfileForm.firstName,
                            lastName: userProfileForm.lastName,
                            avatar: userProfileForm.avatar,
                            userName:
                                `${userProfileForm.firstName}_${userProfileForm.lastName}_`.toLowerCase() + user.id,
                            email: userProfileForm.email,
                        },
                        {
                            id: customer.id,
                            firstName: userProfileForm.firstName,
                            lastName: userProfileForm.lastName,
                            dni: userProfileForm.dni,
                            telephone: userProfileForm.telephone,
                            address: userProfileForm.address,
                            birthDate: userProfileForm.birthDate,
                            email: userProfileForm.email,
                        }
                    )
                )
            )
            .subscribe(
                (result) => {
                    this.saved = true;
                    this.form.disable();
                    this.authenticationService.currentUser.next(result);
                    this.toastService.success('¡Tus datos fueron actualizados correctamente!');
                },
                (error) => {
                    this.toastService.error('Error en actualización de datos: ' + error);
                }
            );
    }
}

function existingDniValidator(customerService: CustomerService, initialValue = null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return control.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => customerService.getByDni(value)),
            map((customer: Customer) =>
                customer && customer.dni && customer.dni !== initialValue ? { dniAlreadyAssigned: true } : null
            ),
            first()
        );
    };
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '@services/alert.service';
import { AuthenticationService } from '@services/authentication.service';

@Component({ templateUrl: 'login.component.html', selector: 'app-login', styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService
            .login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                (data) => {
                    this.router.navigate([this.returnUrl]);
                },
                (error) => {
                    console.log(error);
                    this.toastrService.error('Ha ocurrido un error. Compruebe su usuario y contraseña');
                    this.loading = false;
                }
            );
    }
}

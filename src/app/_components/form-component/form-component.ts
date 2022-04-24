import { FormGroup } from '@angular/forms';

export abstract class FormComponent<T> {
    get controls() {
        return this.form.controls;
    }

    get value(): T {
        return this.form.value;
    }

    protected form: FormGroup;
    protected saved: boolean;
    protected submitted: boolean;
}

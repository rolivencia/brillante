import { UntypedFormGroup } from '@angular/forms';

export abstract class FormComponent<T> {
    get controls() {
        return this.form.controls;
    }

    get value(): T {
        return this.form.value;
    }

    protected form: UntypedFormGroup;
    protected saved: boolean;
    protected submitted: boolean;
}

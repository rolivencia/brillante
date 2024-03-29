import { AbstractControl, FormGroup } from '@angular/forms';

export interface FormHandler<Form, Object> {
    load(object: Object): FormGroup;
    clean(): void;
    patch(object: Object): void;
    get(): Object;
    assign(control: { [p: string]: AbstractControl }): Object;
    create(form: Form): Promise<boolean>;
    update(form: Form): Promise<boolean>;
}

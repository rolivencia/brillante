import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHandler } from '@interfaces/form-handler';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransactionConcept } from '@models/cash-transaction';
import { Audit } from '@models/audit';

@Injectable({
    providedIn: 'root',
})
export class MoneyTransactionConceptsFormHandlerService implements FormHandler<FormGroup, TransactionConcept> {
    get transactionConcept(): TransactionConcept {
        return this._transactionConcept;
    }

    set transactionConcept(value: TransactionConcept) {
        this._transactionConcept = value;
    }
    get formGroup(): FormGroup {
        return this._formGroup;
    }

    set formGroup(value: FormGroup) {
        this._formGroup = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get transactionConceptControl() {
        return this.formGroup.controls;
    }

    private _transactionConcept: TransactionConcept;
    private _formGroup: FormGroup;
    private _submitted: boolean = false;

    constructor(private formBuilder: FormBuilder) {}

    public load(transactionConcept: TransactionConcept = this.transactionConcept): FormGroup {
        return this.formBuilder.group({
            id: [transactionConcept.id],
            description: [transactionConcept.description, [Validators.required, Validators.minLength(3)]],
            transactionType: [transactionConcept.transactionType, [Validators.required]],
            parent: [transactionConcept.parent],
            children: [transactionConcept.children],
            userAssignable: [transactionConcept.userAssignable, [Validators.required]],
            enabled: [transactionConcept.enabled, [Validators.required]],
            modifiable: [transactionConcept.modifiable, [Validators.required]],
        });
    }

    public patch(transactionConcept: TransactionConcept = this.transactionConcept): void {
        this.formGroup.patchValue({
            id: transactionConcept.id,
            description: transactionConcept.description,
            transactionType: transactionConcept.transactionType,
            parent: transactionConcept.parent,
            children: transactionConcept.children,
            userAssignable: transactionConcept.userAssignable,
            enabled: transactionConcept.enabled,
            modifiable: transactionConcept.modifiable,
        });
    }

    public clean(): void {
        this.submitted = false;
        this.transactionConcept = new TransactionConcept();
        this.patch();
    }

    public assign(
        transactionConcept: { [p: string]: AbstractControl } = this.transactionConceptControl
    ): TransactionConcept {
        return {
            id: transactionConcept.id.value,
            description: transactionConcept.description.value,
            transactionType: transactionConcept.transactionType.value,
            parent: transactionConcept.parent.value,
            children: transactionConcept.children.value,
            userAssignable: transactionConcept.userAssignable.value,
            enabled: transactionConcept.enabled.value,
            modifiable: transactionConcept.modifiable.value,
            audit: new Audit(), // FIXME: Check on how to load/refresh audit here
        };
    }

    public create(form: FormGroup = this.formGroup): Promise<boolean> {
        // TODO: Implement method
        return Promise.resolve(false);
    }

    public update(form: FormGroup = this.formGroup): Promise<boolean> {
        // TODO: Implement method
        return Promise.resolve(false);
    }

    public get(): TransactionConcept {
        return this._transactionConcept;
    }
}

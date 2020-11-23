import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormHandler } from '@app/_interfaces/form-handler';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { Audit } from '@app/_models/audit';

@Injectable({
    providedIn: 'root',
})
export class CashTransactionConceptsFormHandlerService implements FormHandler<FormGroup, TransactionConcept> {
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

    constructor(private formBuilder: FormBuilder, private toastrService: ToastrService) {}

    public load(transactionConcept: TransactionConcept): FormGroup {
        return this.formBuilder.group({
            id: [transactionConcept.id],
            description: [transactionConcept.description],
            transactionType: [transactionConcept.transactionType],
            parent: [transactionConcept.parent],
            children: [transactionConcept.children],
            userAssignable: [transactionConcept.userAssignable],
            enabled: [transactionConcept.enabled],
            modifiable: [transactionConcept.modifiable],
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

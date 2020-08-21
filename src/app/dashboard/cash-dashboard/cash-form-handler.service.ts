import { Audit } from '@app/_models/audit';
import { BehaviorSubject } from 'rxjs';
import { CashService } from '@app/_services/cash.service';
import { CashTransaction, Operation, TransactionConcept, TransactionType } from '@app/_models/cash-transaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHandler } from '@app/_interfaces/form-handler';
import { Injectable } from '@angular/core';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class CashFormHandlerService implements FormHandler<FormGroup, CashTransaction> {
    get transactionConcepts(): TransactionConcept[] {
        return this._transactionConcepts;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }
    get formGroup(): FormGroup {
        return this._formGroup;
    }

    set formGroup(value: FormGroup) {
        this._formGroup = value;
    }
    get cashTransaction(): CashTransaction {
        return this._cashTransaction;
    }

    set cashTransaction(value: CashTransaction) {
        this._cashTransaction = value;
    }

    get saved(): boolean {
        return this._saved;
    }

    set saved(value: boolean) {
        this._saved = value;
    }

    get cashControl() {
        return this.formGroup.controls;
    }

    private _submitted: boolean = false;
    private _saved: boolean = false;

    private _transactionTypes: TransactionType[] = [
        { id: 0, description: 'Egreso' },
        { id: 1, description: 'Ingreso' },
    ];

    public controlsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _transactionOperations: Operation[] = [];
    private _transactionConcepts: TransactionConcept[] = [];
    public transactionParentConcept: TransactionConcept = new TransactionConcept();

    private _formGroup: FormGroup;
    private _cashTransaction: CashTransaction = new CashTransaction();

    constructor(
        private cashService: CashService,
        private formBuilder: FormBuilder,
        private legacyMapperService: LegacyMapperService,
        private toastrService: ToastrService
    ) {
        this.loadConcepts().then((concepts) => {
            this._transactionConcepts = concepts;
            this.controlsLoaded.next(true);
        });
    }

    public load(transaction: CashTransaction = this.cashTransaction): FormGroup {
        return this.formBuilder.group({
            id: [transaction.id],
            concept: [transaction.concept, [Validators.required]],
            amount: [transaction.amount, [Validators.required]],
            date: [transaction.date, [Validators.required]],
            note: [transaction.note, [Validators.required, Validators.minLength(10)]],
            operation: [transaction.operation],
        });
    }

    public patch(transaction: CashTransaction = this.cashTransaction) {
        this.formGroup.patchValue({
            id: transaction.id,
            concept: transaction.concept,
            amount: transaction.amount,
            date: transaction.date,
            note: transaction.note,
            operation: transaction.operation,
        });
    }

    public clean() {
        this.submitted = false;
        this.cashTransaction = new CashTransaction();
        this.patch();
    }

    public assign(cashTransactionForm = this.cashControl): CashTransaction {
        return {
            id: cashTransactionForm.id.value,
            concept: cashTransactionForm.concept.value,
            amount: cashTransactionForm.amount.value,
            date: cashTransactionForm.date.value,
            note: cashTransactionForm.note.value,
            operation: cashTransactionForm.operation.value,
            audit: new Audit(), // FIXME: Check on how to load/refresh audit here
        };
    }

    async create(formGroup = this.formGroup): Promise<boolean> {
        this.submitted = true;
        if (this.formGroup.invalid) {
            this.toastrService.info('Falta llenar campos para dar de alta esta transacción.');
            return;
        }
        this.cashTransaction = this.assign();
        this.patch();

        const legacyCashTransaction = this.legacyMapperService.toLegacyCashTransaction(this.cashTransaction);
        const result = await this.cashService.createLegacy(legacyCashTransaction).toPromise();

        return new Promise((resolve, reject) => {
            if (!result || result.errorCode || result.historyErrorCode) {
                if (result.errorCode) {
                    this.toastrService.error(result.errorCode);
                    reject(false);
                }
            } else if (result && result.transactionId) {
                this.toastrService.success(`Transacción ID: ${result.transactionId} agregada con éxito`);
                resolve(true);
            }
        });
    }

    async update(formGroup = this.formGroup): Promise<boolean> {
        this.submitted = true;

        if (this.formGroup.invalid) {
            this.toastrService.info('Falta llenar campos para poder modificar esta transacción.');
            return;
        }
        this.cashTransaction = this.assign();
        this.patch();

        // TODO: Add code that communicates with Cash endpoint to update instance

        const legacyCashTransaction = this.legacyMapperService.toLegacyCashTransaction(this.cashTransaction);
        const result = await this.cashService.updateLegacy(legacyCashTransaction).toPromise();

        return new Promise((resolve, reject) => {
            if (!result || result.errorCode || result.historyErrorCode) {
                if (result.errorCode) {
                    this.toastrService.error(result.errorCode);
                    reject(false);
                }
            } else if (result && result.transactionId) {
                this.toastrService.info(`Transacción ID: ${result.transactionId} editada con éxito`);
                resolve(true);
            }
        });
    }

    get(): CashTransaction {
        return this.cashTransaction;
    }

    transactionChildrenConcepts(parent: TransactionConcept): TransactionConcept[] {
        return parent.children;
    }

    async loadConcepts(): Promise<TransactionConcept[]> {
        // TODO: Refactor to use new NodeJS API. Get children concepts based on parent as parameter. Do this assignments server-side
        const parentRawConcepts = (await this.cashService.getConceptsLegacy(true).toPromise()).data;
        const childrenRawConcepts = (await this.cashService.getConceptsLegacy(false).toPromise()).data;

        const parentConcepts = parentRawConcepts.map((concept) => ({
            id: concept.conceptId,
            description: concept.description,
            transactionType: this._transactionTypes.filter((transactionType) => concept.transactionTypeId === transactionType.id)[0],
            parent: null,
            children: [],
        }));

        const childrenConcepts = childrenRawConcepts.map((concept) => ({
            id: concept.conceptId,
            description: concept.description,
            transactionType: this._transactionTypes.filter((transactionType) => concept.transactionTypeId === transactionType.id)[0],
            parent: parentConcepts.filter((parent) => parent.id === concept.parentConceptId)[0],
            children: [],
        }));

        return parentConcepts.map((concept) => ({
            ...concept,
            children: childrenConcepts.filter((children) => children.parent.id === concept.id),
        }));
    }
}
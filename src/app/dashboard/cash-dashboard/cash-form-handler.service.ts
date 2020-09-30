import { Audit } from '@app/_models/audit';
import { BehaviorSubject } from 'rxjs';
import { CashService } from '@app/_services/cash.service';
import { CashTransaction, Operation, TransactionConcept, TransactionType } from '@app/_models/cash-transaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHandler } from '@app/_interfaces/form-handler';
import { Injectable } from '@angular/core';
import { LegacyMapperService } from '@app/_services/legacy-mapper.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class CashFormHandlerService implements FormHandler<FormGroup, CashTransaction> {
    get selectableTransactionConcepts(): TransactionConcept[] {
        return this._selectableTransactionConcepts;
    }

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
        { id: 0, description: 'Ingreso' },
        { id: 1, description: 'Egreso' },
    ];

    public controlsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _transactionOperations: Operation[] = [];
    private _transactionConcepts: TransactionConcept[] = [];
    private _selectableTransactionConcepts: TransactionConcept[] = [];
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
            this._transactionConcepts = _.cloneDeep(concepts);

            const selectableParentTransactionConcepts: TransactionConcept[] = concepts.filter(
                (parentConcept) => parentConcept.userAssignable
            );

            selectableParentTransactionConcepts.forEach((parentConcept) => {
                parentConcept.children = parentConcept.children.filter((childrenConcept) => childrenConcept.userAssignable);
            });

            this._selectableTransactionConcepts = [].concat(selectableParentTransactionConcepts);

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

        const result = await this.cashService.create(this.cashTransaction).toPromise();
        return new Promise((resolve, reject) => {
            if (!result) {
                this.toastrService.error("Ocurrió un error. La reparación no pudo ser creada.");
                reject(false);
            } else {
                this.toastrService.success(`Transacción ID: ${result.id} agregada con éxito`);
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

    async loadConcepts(): Promise<TransactionConcept[]> {
        return await this.cashService.getConcepts().toPromise();
    }
}

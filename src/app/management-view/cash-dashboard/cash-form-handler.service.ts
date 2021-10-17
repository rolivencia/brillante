import { Audit } from '@models/audit';
import { CashService } from '@services/cash.service';
import { CashTransaction, Operation, PaymentMethod, TransactionConcept } from '@models/cash-transaction';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHandler } from '@interfaces/form-handler';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { AuthenticationService } from '@services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class CashFormHandlerService implements FormHandler<FormGroup, CashTransaction> {
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

    get paymentsArray(): FormArray {
        return this._formGroup.get('payments') as FormArray;
    }

    private _submitted: boolean = false;
    private _saved: boolean = false;

    private _transactionOperations: Operation[] = [];
    public transactionParentConcept: TransactionConcept = new TransactionConcept();

    private _formGroup: FormGroup;
    private _cashTransaction: CashTransaction = new CashTransaction();

    constructor(
        private authenticationService: AuthenticationService,
        private cashService: CashService,
        private formBuilder: FormBuilder,
        private toastrService: ToastrService
    ) {}

    public load(transaction: CashTransaction = this.cashTransaction): FormGroup {
        return this.formBuilder.group({
            id: [transaction.id],
            concept: [transaction.concept, [Validators.required]],
            date: [transaction.date, [Validators.required]],
            note: [transaction.note, [Validators.required, Validators.minLength(10)]],
            operation: [transaction.operation],
            amount: [transaction.amount, [Validators.required]],
            paymentMethod: [transaction.paymentMethod, [Validators.required]],
            payments: this.formBuilder.array(
                transaction.payments.length ? transaction.payments : [this.createPayment()]
            ),
        });
    }

    private createPayment() {
        return this.formBuilder.group({
            amount: [0, [Validators.required, Validators.min(1)]],
            method: [new PaymentMethod(), [Validators.required]],
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
            paymentMethod: transaction.paymentMethod,
            payments: transaction.payments ? transaction.payments : [],
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
            paymentMethod: cashTransactionForm.paymentMethod.value,
            payments: cashTransactionForm.payments.value,
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

        this.cashTransaction.date = moment();

        const result = await this.cashService
            .create(this.cashTransaction, this.authenticationService.currentUserValue)
            .toPromise();
        return new Promise((resolve, reject) => {
            if (!result) {
                this.toastrService.error('Ocurrió un error. La reparación no pudo ser creada.');
                reject(false);
            } else {
                this.toastrService.success(`Transacción ID: ${result[0].id} agregada con éxito`);
                this.clean();
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

        const [result] = await this.cashService.update(this.cashTransaction).toPromise();

        return new Promise((resolve, reject) => {
            if (!result) {
                this.toastrService.error('Ocurrió un error. La reparación no pudo ser actualizada.');
                reject(false);
            } else {
                this.toastrService.info(`Transacción ID: ${this.cashTransaction.id} editada con éxito`);
                resolve(true);
            }
        });
    }

    get(): CashTransaction {
        return this.cashTransaction;
    }
}

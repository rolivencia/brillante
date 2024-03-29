import { MoneyTransactionConceptsFormHandlerService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts-form-handler.service';
import { MoneyTransactionConceptsService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { MoneyTransactionConceptsHttpService } from '@management-view/settings-dashboard/money-transaction-concepts/money-transaction-concepts.http.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionConcept, TransactionType } from '@models/cash-transaction';
import { ToastrService } from 'ngx-toastr';
import { ChangeEventArgs, FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'app-cash-transaction-concept-add',
    templateUrl: './money-transaction-concept-add.component.html',
    styleUrls: ['./money-transaction-concept-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyTransactionConceptAddComponent implements OnInit {
    @Input() label: string = '';
    @Input() parent: TransactionConcept;

    @Output() created: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    public moneyTransactionFields: FieldSettingsModel = { text: 'description', value: 'id' };
    public concept: TransactionConcept = new TransactionConcept();
    public addMode: boolean = false;
    public typeId: number = 0; // FIXME: Replace this placeholder variable for a reactive form to handle the whole component

    constructor(
        public cashTransactionConceptsService: MoneyTransactionConceptsService,
        public moneyTransactionConceptsFormHandlerService: MoneyTransactionConceptsFormHandlerService,
        private cashTransactionConceptsHttpService: MoneyTransactionConceptsHttpService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.concept.transactionType = [].concat(this.cashTransactionConceptsService.transactionTypes).shift();
        if (this.parent) {
            this.concept.parent = this.parent; // Contemplates case where parent has no children and concept no siblings
            this.concept.transactionType = this.parent.transactionType;
        } else {
            this.concept.userAssignable = true; // If parent concept, it should be user assignable by default.
        }
    }

    public async create() {
        // TODO: Issue #77 - Make it work using the form handler service
        // const result = await this.cashTransactionConceptsFormHandlerService.create();

        const result = await this.cashTransactionConceptsHttpService.create(this.concept).toPromise();

        if (result) {
            this.created.emit(result);
            this.toastrService.success(`El concepto ID: ${result.id} fue agregado exitosamente.`);
            this.goBack();
        } else {
            this.toastrService.error(`Ocurrió un error al intentar agregar el nuevo concepto.`);
        }
    }

    cancel() {
        this.goBack();
    }

    goBack(concept: TransactionConcept = null) {
        this.cashTransactionConceptsService.addMode.next({
            value: false,
            concept: concept,
        });
    }

    public onTypeChange(event: ChangeEventArgs) {
        this.concept.transactionType = event.itemData as TransactionType;
    }
}

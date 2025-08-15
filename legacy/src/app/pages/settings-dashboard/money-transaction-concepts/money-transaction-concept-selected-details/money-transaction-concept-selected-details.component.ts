import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionConcept } from '@models/cash-transaction';
import { MoneyTransactionConceptsService } from '@pages/settings-dashboard/money-transaction-concepts/money-transaction-concepts.service';
import { MoneyTransactionConceptsHttpService } from '@pages/settings-dashboard/money-transaction-concepts/money-transaction-concepts.http.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeEventArgs, FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-cash-transaction-concept-details',
    templateUrl: './money-transaction-concept-selected-details.component.html',
    styleUrls: ['./money-transaction-concept-selected-details.component.scss'],
    standalone: false,
})
export class MoneyTransactionConceptSelectedDetailsComponent implements OnInit {
    @Input() concept: TransactionConcept;
    @Input() addMode: boolean = false;
    @Input() editMode: boolean = false;
    @Input() itemsSource: TransactionConcept[] = [];
    @Input() label: string = '';
    @Input() showSiblingsGrid: boolean = false;

    @Output() statusChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();
    @Output() selectionChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    public moneyTransactionFields: FieldSettingsModel = { text: 'description', value: 'id' };
    public form: UntypedFormGroup = new UntypedFormGroup({});

    constructor(
        private formBuilder: UntypedFormBuilder,
        private moneyTransactionConceptsHttpService: MoneyTransactionConceptsHttpService,
        private moneyTransactionConceptsService: MoneyTransactionConceptsService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        if (this.concept) {
            this.form = this.formBuilder.group({
                idSelectedConcept: [this.concept.id, [Validators.required]],
            });
        }
    }

    enableAddMode() {
        const concept = new TransactionConcept();
        concept.parent = this.concept
            ? this.concept.parent
            : this.moneyTransactionConceptsService.transactionParentConcept;

        this.moneyTransactionConceptsService.addMode.next({
            value: true,
            concept: concept,
        });
    }

    enableEditMode() {
        this.moneyTransactionConceptsService.editMode.next({
            value: true,
            concept: this.concept,
        });
    }

    async toggleStatus() {
        const result = this.concept.enabled
            ? await this.moneyTransactionConceptsHttpService.disable(this.concept).toPromise()
            : await this.moneyTransactionConceptsHttpService.enable(this.concept).toPromise();

        if (result.pop()) {
            this.concept.enabled = !this.concept.enabled; // Toggle status to opposite if update was done in DB
            this.toastrService.info(
                `Concepto ID: ${this.concept.id} ${
                    this.concept.enabled ? 'habilitado' : 'deshabilitado'
                } correctamente.`
            );
            this.statusChanged.emit(this.concept);
        } else {
            this.toastrService.error(`Error al actualizar status del concepto ID: ${this.concept.id}.`);
        }
    }

    onSelectionChange(event: ChangeEventArgs) {
        if (event) {
            this.selectionChanged.emit(event.itemData as TransactionConcept);
        }
    }
}

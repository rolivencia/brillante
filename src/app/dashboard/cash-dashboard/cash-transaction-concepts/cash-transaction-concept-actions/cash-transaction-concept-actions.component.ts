import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CashTransactionConceptsService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.service';
import { Subscription } from 'rxjs';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { CashTransactionConceptsHttpService } from '@app/dashboard/cash-dashboard/cash-transaction-concepts/cash-transaction-concepts.http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cash-transaction-concept-actions',
    templateUrl: './cash-transaction-concept-actions.component.html',
    styleUrls: ['./cash-transaction-concept-actions.component.scss'],
})
export class CashTransactionConceptActionsComponent implements OnInit, OnDestroy {
    @Input() concept: TransactionConcept;
    @Output() dataChanged: EventEmitter<TransactionConcept> = new EventEmitter<TransactionConcept>();

    addMode: { value: boolean } & { concept: TransactionConcept } = {
        value: false,
        concept: null,
    };

    editMode: { value: boolean } & { concept: TransactionConcept } = {
        value: false,
        concept: null,
    };

    public addModeSubscription: Subscription;
    public editModeSubscription: Subscription;

    constructor(
        private cashCategoriesService: CashTransactionConceptsService,
        private cashConceptsHttpService: CashTransactionConceptsHttpService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.addModeSubscription = this.cashCategoriesService.editMode.subscribe((result) => {
            this.addMode.value = result.value;
            this.addMode.concept = result.concept;
        });
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe((result) => {
            this.editMode.value = result.value;
            this.editMode.concept = result.concept;
        });
    }

    ngOnDestroy(): void {
        this.addModeSubscription.unsubscribe();
        this.editModeSubscription.unsubscribe();
    }

    async create() {
        const result = await this.cashConceptsHttpService.create(this.concept).toPromise();
        if (result.pop()) {
            this.toastrService.success(`Nuevo concepto agregado con ID: ${this.concept.id}.`);
            this.dataChanged.emit(this.concept);
        } else {
            this.toastrService.error(`Error al agregar el nuevo concepto.`);
        }
        this.toggleEditMode(false, null);
        // TODO: Add transaction concepts reload
        // TODO:Add form checking
    }

    toggleAddMode(addModeStatus: boolean) {
        const concept = new TransactionConcept();
        concept.parent = this.concept.parent;

        this.cashCategoriesService.addMode.next({
            value: addModeStatus,
            concept: concept,
        });
    }

    toggleEditMode(editModeStatus: boolean, concept: TransactionConcept) {
        this.cashCategoriesService.editMode.next({
            value: editModeStatus,
            concept: concept,
        });
    }
}

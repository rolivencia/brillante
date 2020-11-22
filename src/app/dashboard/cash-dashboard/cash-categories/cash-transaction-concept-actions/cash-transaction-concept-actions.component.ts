import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { CashCategoriesService } from '@app/dashboard/cash-dashboard/cash-categories/cash-categories.service';
import { Subscription } from 'rxjs';
import { TransactionConcept } from '@app/_models/cash-transaction';
import { CashConceptsHttpService } from '@app/dashboard/cash-dashboard/cash-categories/cash-concepts.http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cash-transaction-concept-actions',
    templateUrl: './cash-transaction-concept-actions.component.html',
    styleUrls: ['./cash-transaction-concept-actions.component.scss'],
})
export class CashTransactionConceptActionsComponent
    implements OnInit, OnDestroy {
    @Input() concept: TransactionConcept;

    editMode: { value: boolean } & { concept: TransactionConcept } = {
        value: false,
        concept: null,
    };
    editModeSubscription: Subscription;

    constructor(
        private cashCategoriesService: CashCategoriesService,
        private cashConceptsHttpService: CashConceptsHttpService,
        private toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.editModeSubscription = this.cashCategoriesService.editMode.subscribe(
            (result) => {
                this.editMode.value = result.value;
                this.editMode.concept = result.concept;
            }
        );
    }

    ngOnDestroy(): void {
        this.editModeSubscription.unsubscribe();
    }

    async create() {
        const result = await this.cashConceptsHttpService
            .create(this.concept)
            .toPromise();
        if (result.pop()) {
            this.toastrService.success(
                `Nuevo concepto agregado con ID: ${this.concept.id}.`
            );
        } else {
            this.toastrService.error(`Error al agregar el nuevo concepto.`);
        }
        this.toggleEditMode(false, null);
        // TODO: Add transaction concepts reload
        // TODO:Add form checking
    }

    async save() {
        const result = await this.cashConceptsHttpService
            .update(this.concept)
            .toPromise();
        if (result.pop()) {
            this.toastrService.info(
                `Concepto ID: ${this.concept.id} actualizado correctamente.`
            );
        } else {
            this.toastrService.error(
                `Error al actualizar el concepto ID: ${this.concept.id}.`
            );
        }
        this.toggleEditMode(false, null);
        //TODO: Add transaction concepts reload
        // TODO:Add form checking
    }

    toggleEditMode(editModeStatus: boolean, concept: TransactionConcept) {
        this.cashCategoriesService.editMode.next({
            value: editModeStatus,
            concept: concept,
        });
    }

    toggleStatus() {
        //TODO: Implement method
    }
}

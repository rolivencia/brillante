import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Moment } from "moment";
import { RepairService } from "../../_services/repair.service";
import { RepairLegacy } from "../../_models/index";
import * as moment from "moment";
import { CollectionView, SortDescription } from "wijmo/wijmo";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-repair-dashboard",
  templateUrl: "./repair-dashboard.component.html",
  styleUrls: ["./repair-dashboard.component.scss"]
})
export class RepairDashboardComponent implements OnInit {
  constructor(
    private repairService: RepairService,
    private modalService: NgbModal
  ) {}

  private _selectedRepairData: RepairLegacy = null;
  gridData: any;
  gridCollection: CollectionView;
  pageSize = 22;

  ngbDateFrom: DateObject;
  ngbDateTo: DateObject;

  ngbMinDate: DateObject;
  ngbMaxDate: DateObject;

  private _showFinished = false;
  private _dateFrom: Moment;
  private _dateTo: Moment;

  columns: any[] = [
    { header: "ID", binding: "repairId", width: 50 },
    { header: "Cliente", binding: "nombreApellidoCliente", width: "*" },
    { header: "Marca", binding: "marca", width: 110 },
    { header: "Modelo", binding: "modelo", width: "*" },
    { header: "IMEI", binding: "imei", width: "*" },
    { header: "Última Act.", binding: "fechaUltimaActualizacion", width: "*" },
    { header: "Estado", binding: "estado", width: "*" }
  ];

  displayMonths = 1;
  navigation = "select";
  showWeekNumbers = false;
  outsideDays = "visible";

  ngOnInit() {
    this._dateTo = moment();
    this._dateFrom = moment().subtract(1, "month");

    this.ngbDateTo = this.formatMomentToObject(this._dateTo);
    this.ngbDateFrom = this.formatMomentToObject(this._dateFrom);
    this.ngbMaxDate = this.formatMomentToObject(this._dateTo);

    this.getGridData(this.showFinished);
  }

  formatDate(date: DateObject, fromOrTo: string) {
    const dateString = `${date.year}-${date.month}-${date.day}`;

    if (fromOrTo === "from") {
      this._dateFrom = moment(dateString);
    }
    if (fromOrTo === "to") {
      this._dateTo = moment(dateString);
    }
  }

  formatMomentToObject(momentDate: Moment): DateObject {
    return {
      year: momentDate.get("year"),
      month: momentDate.get("month") + 1,
      day: momentDate.get("date")
    };
  }

  getGridData(showFinished: boolean) {
    this.repairService
      .getAllLegacy(showFinished, this._dateFrom, this._dateTo)
      .subscribe(
        data => {
          this.gridData = data;
          this.gridCollection = new CollectionView(this.gridData.data);
          this.gridCollection.pageSize = this.pageSize;
          this.gridCollection.currentItem = null;
          const sortDescription = new SortDescription(
            "fechaUltimaActualizacion",
            false
          );
          this.gridCollection.sortDescriptions.push(sortDescription);
        },
        error => console.error(error)
      );
  }
  r;

  get showFinished(): boolean {
    return this._showFinished;
  }

  set showFinished(value: boolean) {
    this._showFinished = value;
  }

  getRepairDetails(item) {
    this._selectedRepairData = item;
  }

  get selectedRepairData() {
    return this._selectedRepairData;
  }

  // FIXME: Update to internal link after the update is migrated to Angular app
  goToUpdate(repairId: number) {
    const redirectTo =
      "http://brillante.brillantestore.com/fix-vista-de-actualizacion/?repairId=" +
      repairId;
    window.open(redirectTo, "blank");
  }

  delete(id: number) {
    this.repairService.delete(id).subscribe(
      data => console.log(data.message),
      error => console.error(error.message),
      () => {
        this.modalService.dismissAll();
        this.getGridData(this.showFinished);
      }
    );
  }

  update(repair: RepairLegacy) {
    // TODO: Implement this method
  }

  open(content) {
    this.modalService.open(content);
  }
}

export class DateObject {
  year: number;
  month: number;
  day: number;
}

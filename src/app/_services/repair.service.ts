import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Moment} from 'moment';
import {Observable} from 'rxjs';
import {RepairLegacy} from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private webApiUrl = `http://brillante.rolivencia.xyz/api/fix/reparacion.php`;

  constructor(private http: HttpClient) { }

  public getByIdLegacy(id: number): Observable<RepairLegacy> {
    const params = new HttpParams()
      .set('action', 'getById')
      .append('repairId', id.toString());
    const headers = new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'});
    return this.http.get<RepairLegacy>(this.webApiUrl, {headers: headers, params: params});
  }

  public getAllLegacy(showFinished: boolean, dateFrom: Moment, dateTo: Moment) {
    const params = new HttpParams()
      .set('action', 'getAllByDate')
      .append('mostrarTerminadas', showFinished.toString())
      .append('fechaIngresoDesde', `${dateFrom.format('YYYY-MM-DD')} 00:00:00`)
      .append('fechaIngresoHasta', `${dateTo.format('YYYY-MM-DD')} 23:59:59`);

    const headers = new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'});
    return this.http.get<RepairLegacy>(this.webApiUrl, {headers: headers, params: params});
  }

}

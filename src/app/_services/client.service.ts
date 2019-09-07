import { Injectable } from '@angular/core';
import { GlobalService } from '@app/_services/global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private endpoint = `/cliente.php`;

    constructor(private http: HttpClient, private globalService: GlobalService) {}

    public getAll(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/client`);
    }
}

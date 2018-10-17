import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {StorageService} from './storage.service';
import {Transaction} from '../models/transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    public MAIN_URL = 'http://5.101.180.10:3005/';
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    public token: string;
    public balance: number;
    public name: string;
    public email: string;
    public id: string;
    public transactions: Transaction[];

    constructor(public http: HttpClient,
                public storageSrv: StorageService
                ) {
        this.token = localStorage.getItem('x-access-token');
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    getTransactions(type: string, page?: number): Observable<any> {
        // page = page || 1;
        return this.http.get(
            this.MAIN_URL + `transactions/?page=${page}`,
            { headers: new HttpHeaders({ 'x-access-token': this.token })
            });
    }

    addTransactions(description: string, type: string, cost: number): Observable<any> {
        console.log(description, type, cost);
        console.log(this.MAIN_URL + 'transactions');
        console.log(this.token);
        return this.http.post(this.MAIN_URL + 'transactions', {'description': description, 'type': type, 'cost': cost * 1},
            { headers: new HttpHeaders({ 'x-access-token': this.token }) });
    }
}

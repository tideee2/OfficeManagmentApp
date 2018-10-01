import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    public MAIN_URL = 'http://5.101.180.10:3005/';
    private  GET_TRANSACTION_URL;
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(public http: HttpClient,

                ) {
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

    getTransactions(type: string, start: string, finish: string, page: number, token: string): Observable<any> {
        const GET_TRANSACTION_URL = `${this.MAIN_URL}transactions/?type=${type}&start=${start}&finish=${finish}&page=${page}`;
        console.log(GET_TRANSACTION_URL);
        return this.http.get(GET_TRANSACTION_URL, { headers: new HttpHeaders({ 'x-access-token': token }) });
    }
    // addTransactions(description: string, type: string, cost: number): Observable<any> {
    //     const GET_TRANSACTION_URL = `${this.MAIN_URL}transactions/?type=${type}&start=${start}&finish=${finish}&page=${page}`;
    // }
}

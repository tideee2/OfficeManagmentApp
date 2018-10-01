import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = 'http://5.101.180.10:3002/';
    private url2 = 'http://5.101.180.10:3002/transactions';
    public aa = 2;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor( private http: HttpClient) {
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
    public registerUser(name: string, email: string, password: string): Observable<any> {
        return this.http.post(this.url + 'auth/registration', {
            'name': name,
            'email': email,
            'password': password
        }, this.httpOptions);
    }
    public loginUser(email: string, password: string) {
        return this.http.post(this.url + 'auth/login', {
            'email': email,
            'password': password
        }, this.httpOptions);
    }
}

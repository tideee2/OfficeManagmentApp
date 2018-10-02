import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private MAIN_URL = 'http://5.101.180.10:3005/';
    private REGISTER_URL = 'http://5.101.180.10:3005/transactions';
    private LOGIN_URL = 'http://5.101.180.10:3005/auth/login';

    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http: HttpClient) {
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
        return this.http.post(this.MAIN_URL + 'auth/registration', {
            'name': name,
            'email': email,
            'password': password
        }, this.httpOptions);
    }

    public loginUser(email: string, password: string) {
        return this.http.post(this.MAIN_URL + 'auth/login', {
            'email': email,
            'password': password
        }, this.httpOptions);
    }

    public changePassword(oldPassword: string, newPassword: string, token: string): Observable<any> {
        return this.http.put(this.MAIN_URL + 'user/password', {
            'confirm': oldPassword,
            'password': newPassword
        }, {headers: new HttpHeaders({'x-access-token': token})});
    }

    public changeUsername(newUsername: string, oldPassword: string, token: string): Observable<any> {
        return this.http.put(this.MAIN_URL + 'user/password', {
            'confirm': oldPassword,
            'username': newUsername
        }, {headers: new HttpHeaders({'x-access-token': token})});
    }

    public forgotPassword(email: string): Observable<any> {
        return this.http.put(this.MAIN_URL + 'auth/change',
            {'email': email},
            {headers: new HttpHeaders({'Content-Type': 'application/json'})}
            );
    }
}

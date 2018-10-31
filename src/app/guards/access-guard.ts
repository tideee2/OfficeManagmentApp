import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable()
export class AboutGuard implements CanActivate {
    private token: string;
    constructor(private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        this.token = localStorage.getItem('x-access-token');

        if ((this.token === null || this.token === '')) {
            console.log(route);
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}

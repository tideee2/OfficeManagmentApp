import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ToastController} from '@ionic/angular';

export class AboutGuard implements CanActivate {
    private token;
    // constructor(public router: Router, public toastController: ToastController) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        this.token = localStorage.getItem('x-access-token');
        if ((this.token === null || this.token === '')) {
            // this.presentToast();
            return false;
        }
        return true;
    }

    // async presentToast() {
    //     const toast = await this.toastController.create({
    //         message: 'Login please',
    //         duration: 2000
    //     });
    //     toast.present();
    // }
}

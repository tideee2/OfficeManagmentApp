import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ToastController} from '@ionic/angular';

export class AboutGuard implements CanActivate {
    private token: string;
    // constructor(public router: Router, public toastController: ToastController) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        this.token = localStorage.getItem('x-access-token');
        // console.log(route.url[0].path);
        // console.log(state.url);
        // state.url = '/home';

        if ((this.token === null || this.token === '')) {
            // this.presentToast();
            return false;
        }
        // state.url
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

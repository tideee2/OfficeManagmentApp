import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutGuard} from './guards/access-guard';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'addPurchase', loadChildren: './add-purchase/add-purchase.module#AddPurchasePageModule', canActivate: [AboutGuard]},
    {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'main', loadChildren: './main/main.module#MainPageModule', canActivate: [AboutGuard]},
    {path: 'change', loadChildren: './change/change.module#ChangePageModule', canActivate: [AboutGuard]},
    {path: 'forgot', loadChildren: './forgot/forgot.module#ForgotPageModule'},
    {path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
    {path: 'user', loadChildren: './user/user.module#UserPageModule', canActivate: [AboutGuard]},
    {path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule', canActivate: [AboutGuard]},
    {path: '**', redirectTo: 'home'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AboutGuard]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, RouteReuseStrategy, Routes} from '@angular/router';
import {HttpClientModule, HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AddPurchasePageModule} from './add-purchase/add-purchase.module';
import {MyscrollDirective} from './myscroll.directive';
import {AuthService} from './services/auth.service';
import {AboutGuard} from './guards/access-guard';
import { IonicStorageModule } from '@ionic/storage';
import { HideHeaderDirective } from './directives/hide-header.directive';

@NgModule({
    declarations: [AppComponent, MyscrollDirective],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AddPurchasePageModule,
        HttpClientModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AboutGuard,
        // AuthService,
        // HttpClient,
        HttpClientModule,
        // HttpHeaders,
        // HttpResponse,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

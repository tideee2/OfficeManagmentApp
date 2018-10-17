import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MainPage} from './main.page';
import {HideHeaderDirective} from '../directives/hide-header.directive';

const routes: Routes = [
    {
        path: '',
        component: MainPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [MainPage, HideHeaderDirective]
})
export class MainPageModule {
}

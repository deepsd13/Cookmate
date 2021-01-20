import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core'

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: AuthComponent }

        ]),
        CommonModule,
        FormsModule,
        SharedModule
    ],
})
export class AuthModule {

}
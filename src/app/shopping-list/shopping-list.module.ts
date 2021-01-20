import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core'

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/auth.guard'

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent, canActivate: [AuthGuard], },

        ]),
        SharedModule,
        FormsModule
    ],
})
export class ShoppingListModule {

}
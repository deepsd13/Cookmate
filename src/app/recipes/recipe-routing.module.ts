import { ShoppingListResolverComponent } from './../shared/shopping-list-resolver.component';
import { BrowseRecipesComponent } from './browse-recipes.component';
import { NgModule } from '@angular/core'

import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeResolverService } from '../recipes/recipes-resolver.service'
import { AuthGuard } from '../auth/auth.guard'


const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent, resolve: [RecipeResolverService, ShoppingListResolverComponent] },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService, ShoppingListResolverComponent] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService, ShoppingListResolverComponent] }
        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule {

}
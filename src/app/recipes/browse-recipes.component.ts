import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from '././../auth/auth.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model'
import { RecipeService } from './recipe.service';

@Component({
    selector: 'app-browse-recipes',
    templateUrl: './browse-recipes.component.html',
    styleUrls: ['./browse-recipes.component.css']
})
export class BrowseRecipesComponent implements OnInit, OnDestroy {
    recipes: Recipe[] = [];
    subscription: Subscription;

    constructor(private recipeService: RecipeService,
        private dbStorageService: DataStorageService,
        private authService: AuthService) { }

    ngOnInit() {
        this.subscription = this.recipeService.recipesChanged.subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes.map(recipe => {
                    if (recipe.ownerId !== this.authService.user.value.id) {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [], ownerId: recipe.ownerId }
                    }
                })
            }
        )

        this.dbStorageService.fetchRecipes();
        this.recipeService.getRecipes().map(recipe => {
            if (recipe && recipe.ownerId !== this.authService.user.value.id) {
                this.recipes.push(recipe);
            }
        })

        console.log(this.recipes);


    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

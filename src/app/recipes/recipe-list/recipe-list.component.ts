import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes.map(recipe => {
          if (recipe && recipe.ownerId === this.authService.user.value.id) {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [], ownerId: recipe.ownerId }
          }
        })
      }
    )
    this.recipes = this.recipeService.getRecipes().map(recipe => {
      if (recipe && recipe.ownerId === this.authService.user.value.id) {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [], ownerId: recipe.ownerId }
      }
    })

  }

  OnNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

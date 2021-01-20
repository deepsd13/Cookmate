import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingList } from './../shopping-list/shopping-list-model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { RecipeService } from '../recipes/recipe.service'
import { map, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })

export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private shoppingListService: ShoppingListService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-ec0d4-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => console.log(response));
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipe-book-ec0d4-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    if (recipes) {
                        return recipes.map(recipe => {
                            if (recipe) {
                                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [], ownerId: recipe.ownerId };
                            }
                        });
                    } else {
                        return [];
                    }
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }

    saveShoppinglist() {
        const shoppingLists = this.shoppingListService.getAllShoppingLists()
        this.http.put('https://recipe-book-ec0d4-default-rtdb.firebaseio.com/shopping-list.json', shoppingLists).subscribe(response => console.log(response));
    }

    fetchShoppinglist() {
        return this.http.get<ShoppingList[]>('https://recipe-book-ec0d4-default-rtdb.firebaseio.com/shopping-list.json')
            .pipe(
                map(shoppingLists => {
                    return shoppingLists.map(sl => {
                        return { ...sl }
                    })
                }),
                tap(shoppingLists => {
                    this.shoppingListService.setShoppingLists(shoppingLists);
                })
            );
    }




}
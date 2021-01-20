import { ShoppingList } from './shopping-list-model';
import { Ingredient } from '../shared/ingredients.model'
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';


@Injectable()
export class ShoppingListService {


    shoppingListChanged = new Subject<ShoppingList>();
    ingredientsChanged = new Subject<Ingredient[]>();
    shoppingListsChanged = new Subject<ShoppingList[]>();
    startedEditing = new Subject<number>();

    private shoppingList: ShoppingList;
    private shoppingLists: ShoppingList[];
    constructor(private authService: AuthService) { }


    setShoppingLists(shoppingLists) {

        this.shoppingLists = shoppingLists;

        shoppingLists.map(sl => {
            if (sl.belongsTo === this.authService.user.value.id) {
                this.shoppingList = sl
            }
        })

        if (!this.shoppingList) {
            this.shoppingList = this.newShoppingList()
            this.shoppingLists.push(this.shoppingList);
        }

        this.shoppingListsChanged.next(this.shoppingLists.slice());
        this.shoppingListChanged.next(this.shoppingList);
    }

    newShoppingList() {
        return new ShoppingList([], this.authService.user.value.id);
    }

    getShoppingList() {
        if (this.shoppingList) {
            return this.shoppingList;
        } else {
            return null;
        }
    }

    getAllShoppingLists() {
        if (this.shoppingLists) {
            return this.shoppingLists.slice();
        } else {
            return null;
        }
    }

    getIngredient(index: number) {
        return this.shoppingList.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.shoppingList.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.shoppingList.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.shoppingList.ingredients.splice(index, 1);
        this.shoppingListChanged.next(this.shoppingList);
        this.ingredientsChanged.next(this.shoppingList.ingredients.slice());
    }

    addIngredient(ingredient: Ingredient) {
        this.shoppingList.ingredients.push(ingredient);
        this.shoppingListChanged.next(this.shoppingList);
        this.ingredientsChanged.next(this.shoppingList.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.shoppingList.ingredients.push(...ingredients);
        this.shoppingListChanged.next(this.shoppingList);
        this.ingredientsChanged.next(this.shoppingList.ingredients.slice());
    }
}
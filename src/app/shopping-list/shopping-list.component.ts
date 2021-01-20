import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ShoppingList } from './shopping-list-model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model'
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  shoppingList: ShoppingList;
  private ingredientChangeSub: Subscription;
  private slSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    // this.dataStorageService.saveShoppinglist();
    this.dataStorageService.fetchShoppinglist().subscribe();

    this.slSubscription = this.shoppingListService.shoppingListChanged.subscribe(
      (sl: ShoppingList) => {
        this.shoppingList = sl;
      })

    this.ingredientChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.shoppingList.ingredients = ingredients;
      }
    )
  }

  editItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe();
    this.slSubscription.unsubscribe();
  }
}

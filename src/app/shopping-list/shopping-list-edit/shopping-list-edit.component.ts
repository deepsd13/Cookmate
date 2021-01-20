import { ShoppingList } from './../shopping-list-model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  edittedItem: Ingredient

  constructor(private shoppingListService: ShoppingListService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.edittedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient)
      this.dataStorageService.saveShoppinglist();
    } else {
      this.shoppingListService.addIngredient(newIngredient);
      this.dataStorageService.saveShoppinglist();
    }
    this.editMode = false;
    form.reset();
  }

  clearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  deleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.dataStorageService.saveShoppinglist();
    this.clearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

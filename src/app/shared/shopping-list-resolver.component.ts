import { Subscription, Observable } from 'rxjs';
import { ShoppingList } from './../shopping-list/shopping-list-model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { DataStorageService } from '../shared/data-storage.service'

@Injectable({ providedIn: 'root' })

export class ShoppingListResolverComponent implements Resolve<ShoppingList[]>{
    constructor(private dataStorageService: DataStorageService, private slService: ShoppingListService, private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const shoppingList = this.slService.getShoppingList();
        const shoppingLists = this.slService.getAllShoppingLists();

        if (!shoppingList) {
            return this.dataStorageService.fetchShoppinglist();
        } else {
            return shoppingLists;
        }

    }
}
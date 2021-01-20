import { Ingredient } from '../shared/ingredients.model';

export class ShoppingList {
    constructor(public ingredients: Ingredient[], public belongsTo: string) { }
}
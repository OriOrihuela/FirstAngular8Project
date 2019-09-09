import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {
  /**
   * PROPERTIES
   */
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10 + "g")
  ];

  /**
   * CONSTRUCTOR
   */
  constructor() {}

  /**
   * GETTERS
   *  
   */
  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientsChanged() {
    return this.ingredientsChanged;
  }

  /**
   * BEHAVIOURS 
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.getIngredientsChanged().emit(this.getIngredients());
  }
}

import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {
  /**
   * PROPERTIES
   */
  ingredientsChanged = new Subject<Ingredient[]>();
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
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.getIngredientsChanged().next(this.getIngredients());
  }
}

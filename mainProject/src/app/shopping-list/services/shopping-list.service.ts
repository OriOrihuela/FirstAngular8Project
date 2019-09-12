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
    new Ingredient("Tomatoes", 10)
  ];
  startedEditing = new Subject<number>();

  /**
   * CONSTRUCTOR
   */
  constructor() {}

  /**
   * GETTERS
   *
   */
  getIngredient(index: number) {
    return this.getIngredients()[index];
  }
  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientsChanged() {
    return this.ingredientsChanged;
  }

  getStartedEditing() {
    return this.startedEditing;
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

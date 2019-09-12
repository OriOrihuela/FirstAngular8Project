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
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.getIngredientsChanged().next(this.ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.getIngredientsChanged().next(this.ingredients);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.getIngredientsChanged().next(this.getIngredients());
  }
}

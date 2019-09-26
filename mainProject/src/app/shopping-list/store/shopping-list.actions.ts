import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";

export class AddIngredient implements Action {
  /**
   * PROPERTIES
   */
  readonly type = ADD_INGREDIENT;

  /**
   * CONSTRUCTOR
   */
  constructor(public ingredient: Ingredient) {}
}
export class AddIngredients implements Action {
  /**
   * PROPERTIES
   */
  readonly type = ADD_INGREDIENTS;

  /**
   * CONSTRUCTOR
   */
  constructor(public ingredient: Ingredient[]) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients;

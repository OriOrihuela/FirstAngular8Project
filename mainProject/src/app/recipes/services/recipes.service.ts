import { Injectable } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/services/shopping-list.service";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  /**
   * PROPERTIES
   */
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  /**
   * CONSTRUCTOR
   */
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  /**
   * GETTERS
   */
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipesChanged() {
    return this.recipesChanged;
  }

  getShoppingListService() {
    return this.shoppingListService;
  }

  /**
   * BEHAVIOURS
   */
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.getRecipesChanged().next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.getRecipesChanged().next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.getRecipesChanged().next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.getRecipesChanged().next(this.getRecipes());
  }
}

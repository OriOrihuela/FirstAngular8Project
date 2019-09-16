import { Injectable } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/services/shopping-list.service";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class RecipesService {

  /**
   * PROPERTIES
   */
  recipesChanged = new Subject<Recipe[]>()
  private recipes: Recipe[] = [
    new Recipe(
      "Lemon Pie",
      "A great dessert for everyone!",
      "assets/images/lemonPie.png",
      [new Ingredient("Lemons", 2), new Ingredient("Flour", 200)]
    ),
    new Recipe(
      "Chicken Wings",
      "Tastelicious!",
      "assets/images/chickenWings.png",
      [new Ingredient("Chicken Wings", 500), new Ingredient("Spices", 5)]
    )
  ];

  /**
   * CONSTRUCTOR
   */
  constructor(private shoppingListService: ShoppingListService) {}

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
    this.getShoppingListService().addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.getRecipesChanged().next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
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

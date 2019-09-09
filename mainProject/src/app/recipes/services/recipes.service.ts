import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  /**
   * PROPERTIES
   */
  private recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "Lemon Pie",
      "A great dessert for everyone!",
      "assets/images/lemonPie.png",
      [new Ingredient("Lemons", 2), new Ingredient("Flour", 200  + "g")]
    ),
    new Recipe(
      "Chicken Wings",
      "Tastelicious!",
      "assets/images/chickenWings.png",
      [new Ingredient("Chicken Wings", 500 + "g"), new Ingredient("Spices", 5)]
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

  getRecipe(index:number) {
    return this.recipes[index]
  }

  getRecipeSelected() {
    return this.recipeSelected;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}

import { Injectable } from "@angular/core";
import { Recipe } from "../recipe.model";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  /**
   * PROPERTIES
   */
  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is simply a test",
      "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/crab-asparagus-pappardelle.jpg"
    ),
    new Recipe(
      "A Test Recipe",
      "This is simply a test",
      "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/crab-asparagus-pappardelle.jpg"
    )
  ];
  /**
   * CONSTRUCTOR
   */
  constructor() {}

  /**
   * GETTERS
   */
  getRecipes() {
    return this.recipes.slice();
  }
}

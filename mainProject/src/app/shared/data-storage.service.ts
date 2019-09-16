import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipesService } from "../recipes/services/recipes.service";
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  /**
   * PROPERTIES
   */

  /**
   * CONSTRUCTOR
   */
  constructor(
    private httpService: HttpClient,
    private recipesService: RecipesService
  ) {}

  /**
   * GETTERS
   */
  getHttpService() {
    return this.httpService;
  }

  getRecipesService() {
    return this.recipesService;
  }

  /**
   * BEHAVIOURS
   */
  storeRecipes() {
    const recipes = this.getRecipesService().getRecipes();
    return this.getHttpService()
      .put(
        "https://fir-angular-project-f485e.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    this.getHttpService().get<Recipe[]>("https://fir-angular-project-f485e.firebaseio.com/recipes.json").subscribe(recipes => {
      this.getRecipesService().setRecipes(recipes);
    });
  }
}

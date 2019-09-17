import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipesService } from "../recipes/services/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

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
    return this.getHttpService()
      .get<Recipe[]>(
        "https://fir-angular-project-f485e.firebaseio.com/recipes.json"
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.getRecipesService().setRecipes(recipes);
        })
      );
  }
}

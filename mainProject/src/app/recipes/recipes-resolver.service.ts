import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipesService } from "./services/recipes.service";

@Injectable({
  providedIn: "root"
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  /**
   * PROPERTIES
   */

  /**
   * CONSTRUCTOR
   */
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService
  ) {}

  /**
   * GETTERS
   */
  getDataStorageService() {
    return this.dataStorageService;
  }

  /**
   * BEHAVIOURS
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    return recipes.length === 0
      ? this.getDataStorageService().fetchRecipes()
      : recipes;
  }
}

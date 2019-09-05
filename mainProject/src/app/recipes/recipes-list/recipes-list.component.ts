import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.scss"]
})
export class RecipesListComponent implements OnInit {
  /**
   * PROPERTIES
   */
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];

  /**
   * CONSTRUCTOR
   */
  constructor(private recipesServices: RecipesService) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.recipes = this.recipesServices.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}

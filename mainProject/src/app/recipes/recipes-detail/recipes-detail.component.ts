import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: "app-recipes-detail",
  templateUrl: "./recipes-detail.component.html",
  styleUrls: ["./recipes-detail.component.scss"]
})
export class RecipesDetailComponent implements OnInit {
  /**
   * PROPERTIES
   */
  @Input() recipe: Recipe;

  /**
   * CONSTRUCTOR
   */
  constructor(private recipeService: RecipesService) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.getIngredients());
  }
}

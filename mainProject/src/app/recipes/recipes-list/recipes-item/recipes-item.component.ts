import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { RecipesService } from "../../services/recipes.service";

@Component({
  selector: "app-recipes-item",
  templateUrl: "./recipes-item.component.html",
  styleUrls: ["./recipes-item.component.scss"]
})
export class RecipesItemComponent implements OnInit {
  /**
   * PROPERTIES
   */
  @Input() recipe: Recipe;

  /**
   * CONSTRUCTOR
   */
  constructor(private recipesService: RecipesService) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {}

  onSelected() {
    this.recipesService.getRecipeSelected().emit(this.recipe);
  }
}

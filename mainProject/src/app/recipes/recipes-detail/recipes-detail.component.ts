import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../services/recipes.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipes-detail",
  templateUrl: "./recipes-detail.component.html",
  styleUrls: ["./recipes-detail.component.scss"]
})
export class RecipesDetailComponent implements OnInit {
  /**
   * PROPERTIES
   */
  recipe: Recipe;
  id: number;

  /**
   * CONSTRUCTOR
   */
  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.recipe.getIngredients()
    );
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
}

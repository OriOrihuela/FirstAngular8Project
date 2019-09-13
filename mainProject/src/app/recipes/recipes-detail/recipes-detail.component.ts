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
   * GETTERS
   */
  getRecipesService() {
    return this.recipeService;
  }

  getRouter() {
    return this.router;
  }
  getRoute() {
    return this.route;
  }

  getId() {
    return this.id;
  }

  getRecipe() {
    return this.recipe;
  }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.getRoute().params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipe = this.getRecipesService().getRecipe(this.getId());
    });
  }

  onAddToShoppingList() {
    this.getRecipesService().addIngredientsToShoppingList(
      this.getRecipe().getIngredients()
    );
  }

  onEditRecipe() {
    this.getRouter().navigate(["edit"], { relativeTo: this.getRoute()});
  }

  onDeleteRecipe() {
    this.getRecipesService().deleteRecipe(this.getId());
    this.getRouter().navigate(["/recipes"]);
  }
}

import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../services/recipes.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.scss"]
})
export class RecipesListComponent implements OnInit {
  /**
   * PROPERTIES
   */
  recipes: Recipe[];

  /**
   * CONSTRUCTOR
   */
  constructor(
    private recipesServices: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * GETTERS
   */
  getRecipes() {
    return this.recipes;
  }

  getRecipesService() {
    return this.recipesServices;
  }

  getRouter() {
    return this.router;
  }

  getRoute() {
    return this.route;
  }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.getRecipesService().getRecipesChanged().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.getRecipesService().getRecipes();
  }

  onNewRecipe() {
    this.getRouter().navigate(["new"], { relativeTo: this.getRoute() });
  }
}

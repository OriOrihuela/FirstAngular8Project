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
   * BEHAVIOURS
   */
  ngOnInit() {
    this.recipes = this.recipesServices.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}

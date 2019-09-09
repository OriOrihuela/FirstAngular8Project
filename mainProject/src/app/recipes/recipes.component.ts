import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  /**
   * PROPERTIES
   */
    selectedRecipe: Recipe;

   /**
    * CONSTRUCTOR
    */
  constructor(private recipesService: RecipesService) { }

  /**
   * BEHAVIOURS 
   */
  ngOnInit() {
    this.recipesService.getRecipeSelected().subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }

}

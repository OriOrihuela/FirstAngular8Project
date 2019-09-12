import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { RecipesService } from "../services/recipes.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.scss"]
})
export class RecipeEditComponent implements OnInit {
  /**
   *  PROPERTIES
   */
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  /**
   * CONSTRUCTOR
   */
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  /**
   * GETTERS
   */
  getId() {
    return this.id;
  }

  getEditMode() {
    return this.editMode;
  }

  getRecipeForm() {
    return this.recipeForm;
  }

  getRecipesService() {
    return this.recipesService;
  }

  getRoute() {
    return this.route;
  }

  getControls() {
    return (this.getRecipeForm().get("ingredients") as FormArray).controls;
  }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.getRecipeForm());
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.getEditMode()) {
      const recipe = this.getRecipesService().getRecipe(this.getId());
      recipeName = recipe.getName();
      recipeImagePath = recipe.getImagePath();
      recipeDescription = recipe.getDescription();
      if (recipe["ingredients"]) {
        for (let ingredient of recipe.getIngredients()) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.getName()),
              amount: new FormControl(ingredient.getAmount())
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });
  }
}

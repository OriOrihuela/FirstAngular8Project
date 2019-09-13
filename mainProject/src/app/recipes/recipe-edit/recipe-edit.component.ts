import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipesService } from "../services/recipes.service";
import { Recipe } from "../recipe.model";

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
    private recipesService: RecipesService,
    private router: Router
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

  getRouter() {
    return this.router;
  }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.getRoute().params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.getRecipeForm().value["name"],
      this.getRecipeForm().value["description"],
      this.getRecipeForm().value["imagePath"],
      this.getRecipeForm().value["ingredients"]
    );
    this.editMode === true
      ? this.getRecipesService().updateRecipe(this.id, newRecipe)
      : this.getRecipesService().addRecipe(newRecipe);
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.getRecipeForm().get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.getRouter().navigate(["../"], { relativeTo: this.getRoute() });
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.getEditMode()) {
      const recipe = this.getRecipesService().getRecipe(this.getId());
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingredients"]) {
        for (let ingredient of recipe.getIngredients()) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    });
  }
}

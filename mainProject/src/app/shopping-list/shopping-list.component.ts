import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit {
  /**
   * PROPERTIES
   */
  ingredients: Ingredient[];

  /**
   * CONSTRUCTOR
   */
  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.getIngredientsChanged().subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
}
